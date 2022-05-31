import { Injectable } from '@angular/core';
import { ResponseSentences } from 'src/api';
import { SessionStorage } from 'src/app/shared/technical/storage/storage.decorator';

export type StepResponse = {
  step: number;
  responses: string[];
};

export type StepResult = {
  success: boolean;
  answer: string;
};

@Injectable()
export class TestService {
  @SessionStorage()
  nbSteps!: number;

  @SessionStorage()
  step!: number;

  @SessionStorage()
  sentences!: ResponseSentences[];

  @SessionStorage()
  responses!: StepResponse[];

  @SessionStorage()
  score!: number;

  get success(): boolean {
    return (
      this.sentences[this.step].fr_value?.replace(/ /g, '') ===
      this.responses[this.step]?.responses.join().replace(/,/g, '')
    );
  }

  get answer(): string {
    return this.sentences[this.step].fr_value ?? '';
  }

  get isLastStep(): boolean {
    return this.step === this.nbSteps - 1;
  }

  constructor() {
    this.nbSteps = this.nbSteps ?? 10;
    this.step = this.step ?? 0;
    this.sentences = this.sentences || [];
    this.responses = this.responses || [];
    this.score = this.score ?? 0;
  }

  init(sentences: ResponseSentences[]): void {
    this.nbSteps = 10;
    this.step = 0;
    this.sentences = sentences;
    this.responses = [];
    this.score = 0;
  }

  nextStep() {
    if (this.step < this.nbSteps - 1) {
      this.step++;
      if (this.success) {
        this.score++;
      }
    }
  }
}
