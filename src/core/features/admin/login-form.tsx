"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/core/components/button";
import { Column } from "@/core/components/layout";
import { Logo } from "@/core/components/logo";
import { Typography } from "@/core/components/typography";

const schema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type FormData = z.infer<typeof schema>;

export function AdminLoginForm() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("Admin");
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    setError(null);
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const body = await response.json().catch(() => null);
      setError(body?.error ?? t("loginError"));
      return;
    }

    router.replace(`/${locale}/admin/dashboard`);
    router.refresh();
  }

  return (
    <Column className="bg-background text-foreground min-h-screen items-center justify-center p-6">
      <section className="border-border bg-component w-full max-w-md rounded-3xl border p-8 shadow-sm">
        <Column className="items-center gap-6">
          <Logo size="lg" />
          <Column className="items-center gap-2 text-center">
            <Typography fontFamily="baloo2" fontWeight="bold" size="xl">
              {t("title")}
            </Typography>
            <Typography color="gray-400">
              {t("subtitle")}
            </Typography>
          </Column>
        </Column>

        <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
          <Column className="gap-4">
            <label className="grid gap-2">
              <Typography fontWeight="medium" size="sm">
                {t("username")}
              </Typography>
              <input
                className="border-border bg-background focus:border-primary-green w-full rounded-xl border px-4 py-3 outline-none"
                autoComplete="username"
                {...register("username")}
              />
              {errors.username && (
                <p className="text-error text-sm">{errors.username.message}</p>
              )}
            </label>

            <label className="grid gap-2">
              <Typography fontWeight="medium" size="sm">
                {t("password")}
              </Typography>
              <input
                className="border-border bg-background focus:border-primary-green w-full rounded-xl border px-4 py-3 outline-none"
                type="password"
                autoComplete="current-password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-error text-sm">{errors.password.message}</p>
              )}
            </label>

            {error && (
              <p className="text-error text-sm" role="alert">
                {error}
              </p>
            )}

            <Button
              label={t("signIn")}
              type="submit"
              width="full"
              loading={isSubmitting}
              disabled={isSubmitting}
              className="mt-2"
            />
          </Column>
        </form>
      </section>
    </Column>
  );
}
