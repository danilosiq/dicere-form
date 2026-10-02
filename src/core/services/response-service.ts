import { prisma } from "@/core/services/prisma";
import type { SurveyFormValues } from "@/core/validations/survey";

export async function createSurveyResponse(data: SurveyFormValues) {
  return prisma.surveyResponse.create({ data });
}
