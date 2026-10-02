import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { AdminDashboard } from "@/core/features/admin/dashboard";
import { ADMIN_SESSION_COOKIE } from "@/core/services/admin-auth-service";
import { getSurveyStats } from "@/core/services/stats-service";

export default async function AdminDashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const cookieStore = await cookies();
  if (cookieStore.get(ADMIN_SESSION_COOKIE)?.value !== "authenticated") {
    redirect(`/${locale}/admin`);
  }

  const stats = await getSurveyStats();

  return <AdminDashboard stats={stats} />;
}
