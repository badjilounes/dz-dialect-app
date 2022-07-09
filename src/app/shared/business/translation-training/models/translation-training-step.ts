export type TranslationTrainingStep = {
  index: number;
  question: string;
  answer: string;
  propositions: string[];
  response: string[];
};

export const EMPTY_STEP: TranslationTrainingStep = {
  index: 0,
  question: '',
  answer: '',
  propositions: [],
  response: [],
};
