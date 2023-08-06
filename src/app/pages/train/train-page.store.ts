import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

type TrainPageState = {};

@Injectable()
export class TrainPageStore extends ComponentStore<TrainPageState> {
  constructor() {
    super();
  }
}
