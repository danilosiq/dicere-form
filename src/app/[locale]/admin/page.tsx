import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { AdminLoginForm } from "@/core/features/admin/login-form";
import { ADMIN_SESSION_COOKIE } from "@/core/services/admin-auth-service";

export default async function AdminPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const cookieStore = await cookies();
  if (cookieStore.get(ADMIN_SESSION_COOKIE)?.value === "authenticated") {
    redirect(`/${locale}/admin/dashboard`);
  }

  return <AdminLoginForm />;
}
