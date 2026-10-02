"use client";

import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

import { Button } from "@/core/components/button";

export function AdminLogoutButton() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("Admin");

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace(`/${locale}/admin`);
    router.refresh();
  }

  return (
    <Button label={t("logout")} variant="ghost" rounded="sm" onClick={logout} />
  );
}
