"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";

import { locales } from "@/i18n/routing";

export function LanguageSelector() {
  const router = useRouter();
  const pathname = usePathname() || "/";
  const locale = useLocale();

  function getDisplayName(code: string) {
    try {
      return new Intl.DisplayNames([locale], { type: "language" }).of(code) ?? code;
    } catch {
      return code;
    }
  }

  function changeLocale(nextLocale: string) {
    const parts = pathname.split("/").filter(Boolean);
    const withoutLocale = parts[0] && locales.includes(parts[0] as (typeof locales)[number])
      ? parts.slice(1)
      : parts;

    router.replace(`/${nextLocale}${withoutLocale.length ? `/${withoutLocale.join("/")}` : ""}`);
  }

  return (
    <select
      aria-label="Selecionar idioma"
      className="border-border bg-component text-foreground rounded-full border px-3 py-2 text-sm"
      value={locale}
      onChange={(event) => changeLocale(event.target.value)}
    >
      {locales.map((code) => (
        <option key={code} value={code}>
          {getDisplayName(code)}
        </option>
      ))}
    </select>
  );
}
