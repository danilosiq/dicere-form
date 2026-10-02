import json
import os
import pathlib
import re
import urllib.request
import urllib.parse

# Load .env from backend if available

API_KEY = os.environ.get("DEEPL_API_KEY", "46790d46-f324-4ee8-b71a-2652795112a4:fx")
BASE_PATH = pathlib.Path("messages/EN.json")
OUT_DIR = pathlib.Path("messages")
LOCALES = [
    "BG", "CS", "DA", "DE", "EL", "EN", "EN-GB", "EN-US", "ES", "ET",
    "FI", "FR", "HU", "ID", "IT", "JA", "KO", "LT", "LV", "NB",
    "NL", "PL", "PT", "PT-BR", "PT-PT", "RO", "RU", "SK", "SL", "SV",
    "TR", "UK", "ZH", "ZH-HANS",
]

placeholder_re = re.compile(r"\{[a-zA-Z0-9_]+\}")

def flatten(obj, prefix=""):
    if isinstance(obj, dict):
        for key, value in obj.items():
            yield from flatten(value, f"{prefix}.{key}" if prefix else key)
    elif isinstance(obj, str):
        yield prefix, obj

def set_by_path(obj, path, value):
    keys = path.split(".")
    cur = obj
    for key in keys[:-1]:
        cur = cur[key]
    cur[keys[-1]] = value

def deepl_translate(texts, target_lang):
    if not texts:
        return []
    # restore placeholder tokens after translation
    protected = []
    for text in texts:
        protected.append(
            text.replace("{current}", "[[DICERE_CURRENT]]").replace(
                "{total}", "[[DICERE_TOTAL]]"
            )
        )
    import subprocess, tempfile
    form = []
    for text in protected:
        form.extend(["-d", f"text={text}"])
    form.extend(["-d", f"target_lang={target_lang}"])
    cmd = [
        "curl", "-s", "-X", "POST", "https://api-free.deepl.com/v2/translate",
        "-H", f"Authorization: DeepL-Auth-Key {API_KEY}",
    ] + form
    result_json = subprocess.check_output(cmd).decode("utf-8")
    result = json.loads(result_json)
    translated = []
    for item in result.get("translations", []):
        text = item.get("text", "")
        text = text.replace("[[DICERE_CURRENT]]", "{current}").replace(
            "[[DICERE_TOTAL]]", "{total}"
        )
        translated.append(text)
    return translated

base = json.loads(BASE_PATH.read_text(encoding="utf-8"))
leaf_paths = [path for path, _ in flatten(base)]
leaf_values = [value for _, value in flatten(base)]

for locale in LOCALES:
    if locale == "PT-BR":
        continue
    out_path = OUT_DIR / f"{locale}.json"
    # Start from base and translate each leaf
    translated_obj = json.loads(json.dumps(base))
    translated_values = []
    for i in range(0, len(leaf_values), 50):
        chunk = leaf_values[i:i+50]
        translated_values.extend(deepl_translate(chunk, locale))
    for path, value in zip(leaf_paths, translated_values):
        set_by_path(translated_obj, path, value)
    # For OptionLabels inside PT/PT-PT/PT, keep same target if locale matches Portuguese? DeepL is OK.
    out_path.write_text(json.dumps(translated_obj, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("wrote", out_path)
