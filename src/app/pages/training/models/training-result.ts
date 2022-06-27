import { TrainingStep } from './training-step';

export type TrainingResult = {
  note: number;
  history: TrainingStep[];
};

export const EMPTY_RESULT: TrainingResult = {
  note: 0,
  history: [],
};
