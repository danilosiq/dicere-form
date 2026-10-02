import { getRequestConfig } from "next-intl/server";

import { defaultLocale, locales } from "@/i18n/routing";

export default getRequestConfig(async ({ locale, requestLocale }) => {
  const resolvedLocale =
    locale ?? (await requestLocale) ?? defaultLocale;

  const safeLocale = locales.includes(resolvedLocale as (typeof locales)[number])
    ? (resolvedLocale as (typeof locales)[number])
    : defaultLocale;

  return {
    locale: safeLocale,
    messages: (await import(`../../messages/${safeLocale}.json`)).default,
  };
});
