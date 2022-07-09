import { TranslationTrainingStep } from './translation-training-step';

export type TranslationTrainingResult = {
  note: number;
  history: TranslationTrainingStep[];
};

export const EMPTY_RESULT: TranslationTrainingResult = {
  note: 0,
  history: [],
};
