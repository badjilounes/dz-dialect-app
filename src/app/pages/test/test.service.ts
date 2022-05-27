import { Injectable } from '@angular/core';
import { ResponseSentences } from 'src/api';

type StepResponse = {
  step: number;
  responses: string[];
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

  nextStep() {
    this.step++;
  }
}
