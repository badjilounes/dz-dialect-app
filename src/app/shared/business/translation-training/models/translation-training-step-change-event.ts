import { TranslationTrainingResult } from './translation-training-result';
import { TranslationTrainingStep } from './translation-training-step';

export type TranslationTrainingStepChangeEvent = {
  result: TranslationTrainingResult;
  current: TranslationTrainingStep;
  previous: TranslationTrainingStep;
};
