import {
  AverageCard,
  BarChartCard,
  Card,
  CountCard,
  DonutChartCard,
  HorizontalBarChartCard,
  PercentageCard,
} from "@/core/components/charts";
import { Column, Row } from "@/core/components/layout";
import { Logo } from "@/core/components/logo";
import { Typography } from "@/core/components/typography";
import { AdminLogoutButton } from "@/core/features/admin/logout-button";
import type { StatsResult } from "@/core/services/stats-service";

export function AdminDashboard({ stats }: { stats: StatsResult }) {
  return (
    <Column className="bg-background text-foreground min-h-screen gap-8 p-6">
      <Row className="items-center justify-between">
        <Logo size="md" />
        <AdminLogoutButton />
      </Row>

      <Column className="gap-2">
        <Typography fontFamily="baloo2" fontWeight="bold" size="xl">
          Dashboard Dicere
        </Typography>
        <Typography color="gray-400">
          Resultados da pesquisa de validação do projeto.
        </Typography>
      </Column>

      {stats.totalResponses === 0 ? (
        <Card title="Nenhuma resposta">
          <Typography color="gray-400">
            Ainda não há respostas salvas. Assim que participantes responderem,
            os indicadores aparecerão aqui.
          </Typography>
        </Card>
      ) : (
        <Column className="gap-6">
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <CountCard
              label="Total de respostas"
              value={stats.totalResponses}
            />
            <CountCard
              label="Respostas recebidas hoje"
              value={stats.responsesToday}
            />
            <PercentageCard
              label="Já precisou conversar com outro idioma"
              value={stats.neededOtherLanguagePercentage}
            />
            <AverageCard
              label="Média de dificuldade por idioma"
              value={stats.languageDifficultyAverage}
            />
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <BarChartCard
              title="Distribuição por faixa etária"
              data={stats.ageRange}
            />
            <BarChartCard
              title="Distribuição por ocupação"
              data={stats.occupation}
            />
            <BarChartCard
              title="Frequência de uso de chamadas online"
              data={stats.callFrequency}
            />
            <BarChartCard
              title="Frequência em que idioma representa dificuldade"
              data={stats.languageDifficulty}
            />
            <HorizontalBarChartCard
              title="Principais contextos de comunicação internacional"
              data={stats.internationalContexts}
            />
            <HorizontalBarChartCard
              title="Idiomas mais selecionados"
              data={stats.interestedLanguages}
            />
            <BarChartCard
              title="Soluções usadas atualmente"
              data={stats.currentSolution}
            />
            <BarChartCard
              title="Principais dificuldades"
              data={stats.mainDifficulty}
            />
            <DonutChartCard
              title="Interesse em utilizar o Dicere"
              data={stats.wouldUseDicere}
            />
            <BarChartCard
              title="Utilidade percebida das legendas traduzidas"
              data={stats.subtitlesUsefulness}
            />
            <AverageCard
              label="Média de utilidade das legendas"
              value={stats.subtitlesUsefulnessAverage}
            />
            <BarChartCard
              title="Principal contexto de uso do Dicere"
              data={stats.mainDicereContext}
            />
            <DonutChartCard
              title="Interesse no chat traduzido"
              data={stats.translatedChatUseful}
            />
            <BarChartCard
              title="Funcionalidade considerada mais importante"
              data={stats.mostImportantFeature}
            />
            <BarChartCard
              title="Tolerância ao atraso da tradução"
              data={stats.acceptableTranslationDelay}
            />
            <BarChartCard
              title="Impacto de erros de tradução"
              data={stats.translationErrorsImpact}
            />
            <BarChartCard
              title="Conforto em uso profissional"
              data={stats.professionalTranslationComfort}
            />
            <AverageCard
              label="Média de conforto profissional"
              value={stats.professionalTranslationComfortAverage}
            />
          </section>
        </Column>
      )}
    </Column>
  );
}
