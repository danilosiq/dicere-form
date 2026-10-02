-- CreateTable
CREATE TABLE "survey_responses" (
    "id" TEXT NOT NULL,
    "ageRange" TEXT NOT NULL,
    "occupation" TEXT NOT NULL,
    "callFrequency" TEXT NOT NULL,
    "neededOtherLanguageCall" TEXT NOT NULL,
    "languageDifficulty" INTEGER NOT NULL,
    "internationalContexts" TEXT[],
    "interestedLanguages" TEXT[],
    "currentSolution" TEXT NOT NULL,
    "mainDifficulty" TEXT NOT NULL,
    "wouldUseDicere" TEXT NOT NULL,
    "subtitlesUsefulness" INTEGER NOT NULL,
    "mainDicereContext" TEXT NOT NULL,
    "manualLanguageSelection" INTEGER NOT NULL,
    "translatedChatUseful" TEXT NOT NULL,
    "mostImportantFeature" TEXT NOT NULL,
    "acceptableTranslationDelay" TEXT NOT NULL,
    "translationErrorsImpact" TEXT NOT NULL,
    "professionalTranslationComfort" INTEGER NOT NULL,
    "privacyImportance" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "survey_responses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "survey_responses_createdAt_idx" ON "survey_responses"("createdAt");
