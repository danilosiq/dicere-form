"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { Controller, useForm, type FieldPath } from "react-hook-form";
import { useTranslations } from "next-intl";

import { Button } from "@/core/components/button";
import { Header } from "@/core/components/header";
import { Column, Row } from "@/core/components/layout";
import { Logo } from "@/core/components/logo";
import { Typography } from "@/core/components/typography";
import { FloatingBackground } from "@/core/features/survey/floating-background";
import { surveySteps, type Question } from "@/core/@types/survey";
import { surveySchema, type SurveyFormValues } from "@/core/validations/survey";

function optionLabel(
  question: Question,
  value: string | number,
  tOptions: ReturnType<typeof useTranslations>,
  tScale: ReturnType<typeof useTranslations>,
) {
  if (question.type === "scale" && typeof value === "number") {
    return tScale(`${question.id}.${value}`);
  }

  return tOptions(String(value));
}

export function SurveyScreen() {
  const t = useTranslations("Survey");
  const tOptions = useTranslations("OptionLabels");
  const tScale = useTranslations("ScaleLabels");
  const tQuestions = useTranslations("Questions");
  const tAbout = useTranslations("About");
  const [started, setStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<SurveyFormValues>({
    resolver: zodResolver(surveySchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      ageRange: undefined,
      occupation: undefined,
      callFrequency: undefined,
      neededOtherLanguageCall: undefined,
      languageDifficulty: undefined,
      internationalContexts: [],
      interestedLanguages: [],
      currentSolution: undefined,
      mainDifficulty: undefined,
      wouldUseDicere: undefined,
      subtitlesUsefulness: undefined,
      mainDicereContext: undefined,
      translatedChatUseful: undefined,
      mostImportantFeature: undefined,
      acceptableTranslationDelay: undefined,
      translationErrorsImpact: undefined,
      professionalTranslationComfort: undefined,
    } as unknown as SurveyFormValues,
  });

  const currentQuestions = surveySteps[currentStep];
  const isLastStep = currentStep === surveySteps.length - 1;
  const progress = Math.round(((currentStep + 1) / surveySteps.length) * 100);

  const currentFields = useMemo(
    () => currentQuestions.map((question) => question.id),
    [currentQuestions],
  );

  async function startQuestions() {
    const valid = await trigger(["name", "email"] as FieldPath<SurveyFormValues>[]);
    if (valid) {
      setStarted(true);
    }
  }

  async function goNext() {
    const valid = await trigger(currentFields as FieldPath<SurveyFormValues>[]);
    if (valid) {
      setCurrentStep((step) => Math.min(step + 1, surveySteps.length - 1));
    }
  }

  async function onSubmit(data: SurveyFormValues) {
    setApiError(null);
    try {
      const response = await fetch("/api/responses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        setApiError(body?.error ?? t("apiError"));
        return;
      }

      setSubmitted(true);
    } catch {
      setApiError(t("apiError"));
    }
  }

  if (submitted) {
    return (
      <Column className="bg-background text-foreground min-h-screen justify-center p-6">
        <section className="border-border bg-component mx-auto w-full max-w-3xl rounded-3xl border p-8 text-center shadow-sm">
          <Column className="items-center gap-4">
            <Logo size="lg" />
            <Typography fontFamily="baloo2" fontWeight="bold" size="xl">
              {t("successTitle")}
            </Typography>
            <Typography color="gray-400">
              {t("successMessage")}
            </Typography>
          </Column>
        </section>
      </Column>
    );
  }

  return (
    <Column className="bg-background text-foreground relative min-h-screen overflow-x-hidden p-6">
      <FloatingBackground />
      <Header />

      <Column className="mx-auto mt-8 w-full max-w-4xl gap-8 pb-10">
        {!started ? (
          <Column className="gap-8">
            <section className="border-border bg-component rounded-3xl border p-6 shadow-sm md:p-8">
              <Column className="gap-5">
                <Typography fontFamily="baloo2" fontWeight="bold" size="xl">
                  {tAbout("title")}
                </Typography>
                <Column className="gap-3">
                  <Typography>{tAbout("paragraph1")}</Typography>
                  <Typography>{tAbout("paragraph2")}</Typography>
                  <Typography>{tAbout("paragraph3")}</Typography>
                  <Typography>{tAbout("paragraph4")}</Typography>
                </Column>
              </Column>
            </section>

            <section className="border-border bg-component rounded-3xl border p-6 shadow-sm md:p-8">
              <Column className="gap-4">
                <Typography fontFamily="baloo2" fontWeight="semibold">
                  {tAbout("identificationTitle")}
                </Typography>

                <label className="grid gap-2">
                  <Typography fontWeight="medium" size="sm">
                    {tQuestions("name")}
                  </Typography>
                  <Controller
                    control={control}
                    name="name"
                    render={({ field }) => (
                      <input
                        className="border-border bg-background focus:border-primary-green w-full rounded-xl border px-4 py-3 outline-none"
                        placeholder={t("namePlaceholder")}
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        name={field.name}
                      />
                    )}
                  />
                  {errors.name && <p className="text-error text-sm">{t("nameRequired")}</p>}
                </label>

                <label className="grid gap-2">
                  <Typography fontWeight="medium" size="sm">
                    {tQuestions("email")}
                  </Typography>
                  <Controller
                    control={control}
                    name="email"
                    render={({ field }) => (
                      <input
                        type="email"
                        className="border-border bg-background focus:border-primary-green w-full rounded-xl border px-4 py-3 outline-none"
                        placeholder={t("emailPlaceholder")}
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        name={field.name}
                      />
                    )}
                  />
                  {errors.email && (
                    <p className="text-error text-sm">{t("emailInvalid")}</p>
                  )}
                </label>

                <Button
                  label={tAbout("nextToQuestions")}
                  onClick={startQuestions}
                  width="full"
                  className="mt-2"
                />
              </Column>
            </section>
          </Column>
        ) : (
          <>
            <Column className="gap-4">
              <Row className="items-center justify-between">
                <Logo size="md" />
                <Typography color="gray-400" size="sm">
                  {t("step", { current: currentStep + 1, total: surveySteps.length })}
                </Typography>
              </Row>
              <Column className="gap-2">
                <Typography fontFamily="baloo2" fontWeight="bold" size="xl">
                  {t("title")}
                </Typography>
                <Typography color="gray-400">
                  {t("description")}
                </Typography>
              </Column>
              <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800">
                <div
                  className="bg-primary-green h-2 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </Column>

            {currentStep === 1 && (
              <section className="border-border bg-component rounded-2xl border p-5">
                <Typography>{t("explanation")}</Typography>
              </section>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
              <Column className="gap-8">
                {currentQuestions.map((question, index) => {
                  const globalIndex =
                    surveySteps
                      .slice(0, currentStep)
                      .reduce((total, step) => total + step.length, 0) +
                    index +
                    1;

                  return (
                    <section
                      key={question.id}
                      className="border-border bg-component rounded-2xl border p-5"
                    >
                      <Column className="gap-4">
                        <Column className="gap-1">
                          <Typography color="gray-400" size="sm">
                            {t("question", { current: globalIndex, total: surveySteps.flat().length })}
                          </Typography>
                          <Typography fontFamily="baloo2" fontWeight="semibold">
                            {tQuestions(question.id)}
                          </Typography>
                          {question.type === "multiple" && (
                            <Typography color="gray-400" size="sm">
                              {t("multiple")}
                            </Typography>
                          )}
                        </Column>

                        <Controller
                          control={control}
                          name={question.id as FieldPath<SurveyFormValues>}
                          render={({ field }) => (
                            <Column className="gap-3">
                              {question.type === "text" && (
                                <input
                                  type={question.inputType ?? "text"}
                                  className="border-border bg-background focus:border-primary-green w-full rounded-xl border px-4 py-3 outline-none"
                                  placeholder={
                                    question.inputType === "email"
                                      ? t("emailPlaceholder")
                                      : t("namePlaceholder")
                                  }
                                  value={typeof field.value === "string" ? field.value : ""}
                                  onChange={field.onChange}
                                  onBlur={field.onBlur}
                                  name={field.name}
                                />
                              )}

                              {question.type !== "multiple" &&
                                question.type !== "text" &&
                                question.options?.map((option) => {
                                  const selected = field.value === option.value;
                                  return (
                                    <label
                                      key={String(option.value)}
                                      className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition ${
                                        selected
                                          ? "border-primary-green bg-primary-green/10"
                                          : "border-border"
                                      }`}
                                    >
                                      <input
                                        type="radio"
                                        className="accent-primary-green"
                                        checked={selected}
                                        onChange={() => field.onChange(option.value)}
                                      />
                                      <Typography>
                                        {optionLabel(
                                          question,
                                          option.value,
                                          tOptions,
                                          tScale,
                                        )}
                                      </Typography>
                                    </label>
                                  );
                                })}

                              {question.type === "multiple" &&
                                question.options?.map((option) => {
                                  const selected = Array.isArray(field.value)
                                    ? field.value.includes(option.value as never)
                                    : false;

                                  return (
                                    <label
                                      key={String(option.value)}
                                      className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition ${
                                        selected
                                          ? "border-primary-purple bg-primary-purple/10"
                                          : "border-border"
                                      }`}
                                    >
                                      <input
                                        type="checkbox"
                                        className="accent-primary-purple"
                                        checked={selected}
                                        onChange={() => {
                                          const current = Array.isArray(field.value)
                                            ? field.value
                                            : [];
                                          field.onChange(
                                            selected
                                              ? current.filter(
                                                  (value) => value !== option.value,
                                                )
                                              : [...current, option.value],
                                          );
                                        }}
                                      />
                                      <Typography>{tOptions(String(option.value))}</Typography>
                                    </label>
                                  );
                                })}
                            </Column>
                          )}
                        />

                        {errors[question.id as keyof SurveyFormValues] && (
                          <p className="text-error text-sm" role="alert">
                            {question.type === "multiple"
                              ? t("errorChooseAtLeast")
                              : question.type === "text" && question.inputType === "email"
                                ? t("emailInvalid")
                                : question.type === "text"
                                  ? t("nameRequired")
                                  : t("errorRequired")}
                          </p>
                        )}
                      </Column>
                    </section>
                  );
                })}

                {apiError && (
                  <p className="text-error text-sm" role="alert">
                    {apiError}
                  </p>
                )}

                <Row className="justify-between pb-10">
                  <Button
                    label={t("back")}
                    variant="ghost"
                    disabled={currentStep === 0 || isSubmitting}
                    onClick={() => setCurrentStep((step) => Math.max(step - 1, 0))}
                  />

                  {isLastStep ? (
                    <Button
                      label={t("submit")}
                      type="submit"
                      loading={isSubmitting}
                      disabled={isSubmitting}
                    />
                  ) : (
                    <Button label={t("next")} onClick={goNext} />
                  )}
                </Row>
              </Column>
            </form>
          </>
        )}
      </Column>
    </Column>
  );
}
