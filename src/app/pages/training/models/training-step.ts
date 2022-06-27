export type TrainingStep = {
  index: number;
  question: string;
  answer: string;
  propositions: string[];
  response: string[];
};

export const EMPTY_STEP: TrainingStep = {
  index: 0,
  question: '',
  answer: '',
  propositions: [],
  response: [],
};
