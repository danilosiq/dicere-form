import { z } from "zod";

export const ageRanges = [
  "Menos de 18 anos",
  "18 a 24 anos",
  "25 a 34 anos",
  "35 a 44 anos",
  "45 a 54 anos",
  "55 anos ou mais",
] as const;

export const occupations = [
  "Estudante",
  "Profissional de tecnologia",
  "Profissional de outra área",
  "Professor ou educador",
  "Autônomo ou freelancer",
  "Empresário",
  "Outro",
] as const;

export const callFrequencies = [
  "Todos os dias",
  "Algumas vezes por semana",
  "Algumas vezes por mês",
  "Raramente",
  "Nunca",
] as const;

export const yesNoAnswers = ["Sim", "Não"] as const;

export const internationalContexts = [
  "Trabalho ou reuniões profissionais",
  "Entrevistas de emprego",
  "Estudos ou aulas",
  "Viagens",
  "Atendimento ao cliente",
  "Conversas pessoais",
  "Freelance ou clientes internacionais",
  "Jogos ou comunidades online",
  "Nenhuma das anteriores",
] as const;

export const interestedLanguages = [
  "Português",
  "Inglês",
  "Espanhol",
  "Italiano",
  "Francês",
  "Alemão",
  "Outro",
] as const;

export const currentSolutions = [
  "Tradutor externo",
  "Legendas automáticas",
  "Conversaria em inglês",
  "Pediria para a pessoa repetir",
  "Pediria ajuda para outra pessoa",
  "Evitaria a chamada",
  "Nunca passei por essa situação",
] as const;

export const mainDifficulties = [
  "Não entender o que a pessoa fala",
  "Não conseguir responder corretamente",
  "Velocidade da conversa",
  "Pronúncia ou sotaque",
  "Traduções imprecisas",
  "Ter que utilizar ferramentas externas",
] as const;

export const dicereUseOptions = [
  "Com certeza não",
  "Provavelmente não",
  "Talvez",
  "Provavelmente sim",
  "Com certeza sim",
] as const;

export const dicereUseContexts = [
  "Reuniões profissionais",
  "Entrevistas de emprego",
  "Clientes internacionais",
  "Estudos ou aulas",
  "Viagens",
  "Conversas pessoais",
  "Não utilizaria",
] as const;

export const translatedChatOptions = ["Sim", "Não", "Talvez"] as const;

export const importantFeatures = [
  "Tradução das falas em tempo real",
  "Legendas durante a chamada",
  "Chat traduzido",
  "Facilidade para entrar por link",
  "Qualidade de áudio e vídeo",
  "Privacidade da chamada",
] as const;

export const acceptableDelays = [
  "Menos de 1 segundo",
  "Entre 1 e 2 segundos",
  "Entre 2 e 5 segundos",
  "Mais de 5 segundos",
  "Não sei avaliar",
] as const;

export const translationErrorOptions = [
  "Sim",
  "Não",
  "Dependeria da frequência dos erros",
] as const;

const enumMessage = "Selecione uma opção";

const scaleMessage = "Selecione uma opção da escala";

export const surveySchema = z.object({
  name: z.string().trim().min(1, "Informe seu nome"),
  email: z.string().trim().min(1, "Informe seu e-mail").email("Informe um e-mail válido"),
  ageRange: z.enum(ageRanges, { error: enumMessage }),
  occupation: z.enum(occupations, { error: enumMessage }),
  callFrequency: z.enum(callFrequencies, { error: enumMessage }),
  neededOtherLanguageCall: z.enum(yesNoAnswers, { error: enumMessage }),
  languageDifficulty: z
    .number({ error: scaleMessage })
    .int()
    .min(1, "Selecione uma opção da escala")
    .max(5, "Selecione uma opção da escala"),
  internationalContexts: z
    .array(z.enum(internationalContexts))
    .min(1, "Selecione pelo menos uma opção"),
  interestedLanguages: z
    .array(z.enum(interestedLanguages))
    .min(1, "Selecione pelo menos uma opção"),
  currentSolution: z.enum(currentSolutions, { error: enumMessage }),
  mainDifficulty: z.enum(mainDifficulties, { error: enumMessage }),
  wouldUseDicere: z.enum(dicereUseOptions, { error: enumMessage }),
  subtitlesUsefulness: z
    .number({ error: scaleMessage })
    .int()
    .min(1, "Selecione uma opção da escala")
    .max(5, "Selecione uma opção da escala"),
  mainDicereContext: z.enum(dicereUseContexts, { error: enumMessage }),
  translatedChatUseful: z.enum(translatedChatOptions, { error: enumMessage }),
  mostImportantFeature: z.enum(importantFeatures, { error: enumMessage }),
  acceptableTranslationDelay: z.enum(acceptableDelays, { error: enumMessage }),
  translationErrorsImpact: z.enum(translationErrorOptions, {
    error: enumMessage,
  }),
  professionalTranslationComfort: z
    .number({ error: scaleMessage })
    .int()
    .min(1, "Selecione uma opção da escala")
    .max(5, "Selecione uma opção da escala"),
});

export type SurveyFormValues = z.infer<typeof surveySchema>;
