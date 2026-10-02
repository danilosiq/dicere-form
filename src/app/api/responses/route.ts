import { NextResponse } from "next/server";

import { createSurveyResponse } from "@/core/services/response-service";
import { surveySchema } from "@/core/validations/survey";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = surveySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Dados inválidos. Revise as respostas." },
        { status: 400 },
      );
    }

    await createSurveyResponse(parsed.data);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("[survey] Failed to save response:", error);

    return NextResponse.json(
      { error: "Não foi possível salvar a resposta." },
      { status: 500 },
    );
  }
}
