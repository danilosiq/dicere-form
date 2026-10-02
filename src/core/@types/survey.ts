import type { SurveyFormValues } from "@/core/validations/survey";

export type QuestionType = "single" | "multiple" | "scale" | "text";

export type QuestionOption = {
  label: string;
  value: string | number;
};

export type Question = {
  id: keyof SurveyFormValues;
  title: string;
  type: QuestionType;
  options?: QuestionOption[];
  scaleLabels?: Record<number, string>;
  inputType?: "text" | "email";
};

function options(values: readonly string[]): QuestionOption[] {
  return values.map((value) => ({ label: value, value }));
}

function scaleOptions(labels: Record<number, string>) {
  return [1, 2, 3, 4, 5].map((value) => ({
    value,
    label: labels[value] ? `${value} - ${labels[value]}` : String(value),
  }));
}

export const questions: Question[] = [
  {
    id: "name",
    title: "Qual é o seu nome?",
    type: "text",
    inputType: "text",
  },
  {
    id: "email",
    title: "Qual é o seu e-mail?",
    type: "text",
    inputType: "email",
  },
  {
    id: "ageRange",
    title: "Qual é a sua faixa etária?",
    type: "single",
    options: options([
      "Menos de 18 anos",
      "18 a 24 anos",
      "25 a 34 anos",
      "35 a 44 anos",
      "45 a 54 anos",
      "55 anos ou mais",
    ]),
  },
  {
    id: "occupation",
    title: "Qual é a sua principal ocupação atualmente?",
    type: "single",
    options: options([
      "Estudante",
      "Profissional de tecnologia",
      "Profissional de outra área",
      "Professor ou educador",
      "Autônomo ou freelancer",
      "Empresário",
      "Outro",
    ]),
  },
  {
    id: "callFrequency",
    title:
      "Com que frequência você participa de chamadas de vídeo ou reuniões online?",
    type: "single",
    options: options([
      "Todos os dias",
      "Algumas vezes por semana",
      "Algumas vezes por mês",
      "Raramente",
      "Nunca",
    ]),
  },
  {
    id: "neededOtherLanguageCall",
    title:
      "Você já precisou conversar por chamada com alguém que falava outro idioma?",
    type: "single",
    options: options(["Sim", "Não"]),
  },
  {
    id: "languageDifficulty",
    title:
      "Com que frequência a diferença de idioma dificulta sua comunicação durante chamadas online?",
    type: "scale",
    options: scaleOptions({
      1: "Nunca",
      2: "Raramente",
      3: "Às vezes",
      4: "Frequentemente",
      5: "Muito frequentemente",
    }),
  },
  {
    id: "internationalContexts",
    title:
      "Em quais situações você poderia precisar conversar com alguém que fala outro idioma?",
    type: "multiple",
    options: options([
      "Trabalho ou reuniões profissionais",
      "Entrevistas de emprego",
      "Estudos ou aulas",
      "Viagens",
      "Atendimento ao cliente",
      "Conversas pessoais",
      "Freelance ou clientes internacionais",
      "Jogos ou comunidades online",
      "Nenhuma das anteriores",
    ]),
  },
  {
    id: "interestedLanguages",
    title:
      "Quais idiomas você teria mais interesse em utilizar em uma ferramenta como o Dicere?",
    type: "multiple",
    options: options([
      "Português",
      "Inglês",
      "Espanhol",
      "Italiano",
      "Francês",
      "Alemão",
      "Outro",
    ]),
  },
  {
    id: "currentSolution",
    title:
      "Quando você não entende o idioma da outra pessoa durante uma chamada, qual solução você normalmente utilizaria?",
    type: "single",
    options: options([
      "Tradutor externo",
      "Legendas automáticas",
      "Conversaria em inglês",
      "Pediria para a pessoa repetir",
      "Pediria ajuda para outra pessoa",
      "Evitaria a chamada",
      "Nunca passei por essa situação",
    ]),
  },
  {
    id: "mainDifficulty",
    title:
      "Qual seria a maior dificuldade ao conversar com alguém que fala outro idioma?",
    type: "single",
    options: options([
      "Não entender o que a pessoa fala",
      "Não conseguir responder corretamente",
      "Velocidade da conversa",
      "Pronúncia ou sotaque",
      "Traduções imprecisas",
      "Ter que utilizar ferramentas externas",
    ]),
  },
  {
    id: "wouldUseDicere",
    title: "Você utilizaria uma plataforma como o Dicere?",
    type: "single",
    options: options([
      "Com certeza não",
      "Provavelmente não",
      "Talvez",
      "Provavelmente sim",
      "Com certeza sim",
    ]),
  },
  {
    id: "subtitlesUsefulness",
    title:
      "Quão útil você considera receber legendas traduzidas em tempo real durante uma chamada?",
    type: "scale",
    options: scaleOptions({ 1: "Nada útil", 5: "Muito útil" }),
  },
  {
    id: "mainDicereContext",
    title: "Em qual situação você mais utilizaria o Dicere?",
    type: "single",
    options: options([
      "Reuniões profissionais",
      "Entrevistas de emprego",
      "Clientes internacionais",
      "Estudos ou aulas",
      "Viagens",
      "Conversas pessoais",
      "Não utilizaria",
    ]),
  },
  {
    id: "translatedChatUseful",
    title:
      "Você consideraria útil possuir um chat com tradução dentro da mesma plataforma?",
    type: "single",
    options: options(["Sim", "Não", "Talvez"]),
  },
  {
    id: "mostImportantFeature",
    title: "Qual funcionalidade você considera mais importante?",
    type: "single",
    options: options([
      "Tradução das falas em tempo real",
      "Legendas durante a chamada",
      "Chat traduzido",
      "Facilidade para entrar por link",
      "Qualidade de áudio e vídeo",
      "Privacidade da chamada",
    ]),
  },
  {
    id: "acceptableTranslationDelay",
    title: "Quanto atraso na tradução você consideraria aceitável?",
    type: "single",
    options: options([
      "Menos de 1 segundo",
      "Entre 1 e 2 segundos",
      "Entre 2 e 5 segundos",
      "Mais de 5 segundos",
      "Não sei avaliar",
    ]),
  },
  {
    id: "translationErrorsImpact",
    title:
      "Uma tradução ocasionalmente incorreta faria você deixar de utilizar a plataforma?",
    type: "single",
    options: options(["Sim", "Não", "Dependeria da frequência dos erros"]),
  },
  {
    id: "professionalTranslationComfort",
    title:
      "Quanto você se sentiria confortável utilizando tradução automática em uma conversa profissional?",
    type: "scale",
    options: scaleOptions({ 1: "Nada confortável", 5: "Muito confortável" }),
  },
];

export const surveySteps = [
  questions.slice(2, 11),
  questions.slice(11, 15),
  questions.slice(15, 19),
];
