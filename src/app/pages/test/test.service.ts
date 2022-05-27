import { Injectable } from '@angular/core';
import { ResponseSentences } from 'src/api';

export type StepResponse = {
  step: number;
  responses: string[];
};

export type StepResult = {
  success: boolean;
  answer: string;
};

@Injectable({
  providedIn: 'root',
})
export class TestService {
  nbSteps = 10;
  step = 0;

  sentences: ResponseSentences[] = [];
  responses: StepResponse[] = [];

  constructor() {}

  getResult(): StepResult | undefined {
    const success =
      this.sentences[this.step].fr_value?.replace(/ /g, '') ===
      this.responses[this.step]?.responses.join().replace(/,/g, '');

    return {
      success,
      answer: this.sentences[this.step].fr_value ?? '',
    };
  }

  nextStep() {
    this.step++;
  }
}
