import { Injectable } from '@angular/core';
import { LocaleStorage } from 'src/app/shared/technical/storage/storage.decorator';
import { SentenceDTO } from 'src/clients/dz-dialect-api';

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
  @LocaleStorage()
  nbSteps!: number;

  @LocaleStorage()
  step!: number;

  @LocaleStorage()
  sentences!: SentenceDTO[];

  @LocaleStorage()
  responses!: StepResponse[];

  @LocaleStorage()
  score!: number;

  get success(): boolean {
    return (
      this.sentences[this.step]?.fr?.replace(/ /g, '') ===
      this.responses[this.step]?.responses?.join().replace(/,/g, '')
    );
  }

  get answer(): string {
    return this.sentences[this.step]?.fr ?? '';
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

  init(sentences: SentenceDTO[]): void {
    this.nbSteps = 10;
    this.step = 0;
    this.sentences = sentences;
    this.responses = [];
    this.score = 0;
  }

  nextStep() {
    if (this.step < this.nbSteps - 1) {
      this.score = this.score + (this.success ? 1 : 0);
      this.step++;
    }
  }

  setStepResponses(responses: string[]) {
    const allResponses = this.responses;

    allResponses[this.step] = {
      step: this.step,
      responses,
    };

    this.responses = allResponses;
  }
}
