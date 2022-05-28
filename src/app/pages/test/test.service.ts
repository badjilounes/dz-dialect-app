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

  get success(): boolean {
    return (
      this.sentences[this.step].fr_value?.replace(/ /g, '') ===
      this.responses[this.step]?.responses.join().replace(/,/g, '')
    );
  }

  get answer(): string {
    return this.sentences[this.step].fr_value ?? '';
  }

  constructor() {}

  nextStep() {
    if (this.step < this.nbSteps - 1) {
      this.step++;
    }
  }
}
