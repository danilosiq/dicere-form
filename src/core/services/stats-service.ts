import { startOfDay } from "date-fns";

import { prisma } from "@/core/services/prisma";

export type ChartDatum = {
  name: string;
  value: number;
};

export type StatsResult = {
  respondents: Array<{ id: string; name: string; email: string }>;
  totalResponses: number;
  responsesToday: number;
  ageRange: ChartDatum[];
  occupation: ChartDatum[];
  callFrequency: ChartDatum[];
  neededOtherLanguagePercentage: number;
  languageDifficulty: ChartDatum[];
  languageDifficultyAverage: number;
  internationalContexts: ChartDatum[];
  interestedLanguages: ChartDatum[];
  currentSolution: ChartDatum[];
  mainDifficulty: ChartDatum[];
  wouldUseDicere: ChartDatum[];
  subtitlesUsefulness: ChartDatum[];
  subtitlesUsefulnessAverage: number;
  mainDicereContext: ChartDatum[];
  translatedChatUseful: ChartDatum[];
  mostImportantFeature: ChartDatum[];
  acceptableTranslationDelay: ChartDatum[];
  translationErrorsImpact: ChartDatum[];
  professionalTranslationComfort: ChartDatum[];
  professionalTranslationComfortAverage: number;
};

function countBy<T extends string>(values: T[]) {
  const map = new Map<string, number>();
  values.forEach((value) => map.set(value, (map.get(value) ?? 0) + 1));
  return Array.from(map.entries()).map(([name, value]) => ({ name, value }));
}

function countMulti(values: string[][]) {
  return countBy(values.flat());
}

function countScale(values: number[]) {
  return [1, 2, 3, 4, 5].map((value) => ({
    name: String(value),
    value: values.filter((item) => item === value).length,
  }));
}

function average(values: number[]) {
  if (values.length === 0) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

export async function getSurveyStats(): Promise<StatsResult> {
  const responses = await prisma.surveyResponse.findMany({
    orderBy: { createdAt: "desc" },
  });

  const todayStart = startOfDay(new Date());
  const responsesToday = responses.filter(
    (response) => response.createdAt >= todayStart,
  ).length;

  const neededYes = responses.filter(
    (response) => response.neededOtherLanguageCall === "Sim",
  ).length;

  return {
    respondents: responses.map(({ id, name, email }) => ({ id, name, email })),
    totalResponses: responses.length,
    responsesToday,
    ageRange: countBy(responses.map((item) => item.ageRange)),
    occupation: countBy(responses.map((item) => item.occupation)),
    callFrequency: countBy(responses.map((item) => item.callFrequency)),
    neededOtherLanguagePercentage:
      responses.length === 0 ? 0 : (neededYes / responses.length) * 100,
    languageDifficulty: countScale(
      responses.map((item) => item.languageDifficulty),
    ),
    languageDifficultyAverage: average(
      responses.map((item) => item.languageDifficulty),
    ),
    internationalContexts: countMulti(
      responses.map((item) => item.internationalContexts),
    ),
    interestedLanguages: countMulti(
      responses.map((item) => item.interestedLanguages),
    ),
    currentSolution: countBy(responses.map((item) => item.currentSolution)),
    mainDifficulty: countBy(responses.map((item) => item.mainDifficulty)),
    wouldUseDicere: countBy(responses.map((item) => item.wouldUseDicere)),
    subtitlesUsefulness: countScale(
      responses.map((item) => item.subtitlesUsefulness),
    ),
    subtitlesUsefulnessAverage: average(
      responses.map((item) => item.subtitlesUsefulness),
    ),
    mainDicereContext: countBy(responses.map((item) => item.mainDicereContext)),
    translatedChatUseful: countBy(
      responses.map((item) => item.translatedChatUseful),
    ),
    mostImportantFeature: countBy(
      responses.map((item) => item.mostImportantFeature),
    ),
    acceptableTranslationDelay: countBy(
      responses.map((item) => item.acceptableTranslationDelay),
    ),
    translationErrorsImpact: countBy(
      responses.map((item) => item.translationErrorsImpact),
    ),
    professionalTranslationComfort: countScale(
      responses.map((item) => item.professionalTranslationComfort),
    ),
    professionalTranslationComfortAverage: average(
      responses.map((item) => item.professionalTranslationComfort),
    ),
  };
}
