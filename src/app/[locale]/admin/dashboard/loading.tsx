import { Column } from "@/core/components/layout";
import { Typography } from "@/core/components/typography";

export default function AdminDashboardLoading() {
  return (
    <Column className="bg-background text-foreground min-h-screen items-center justify-center p-6">
      <Typography fontFamily="baloo2" fontWeight="semibold" size="lg">
        Carregando resultados...
      </Typography>
    </Column>
  );
}
