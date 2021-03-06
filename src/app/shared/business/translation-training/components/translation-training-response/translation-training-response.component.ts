import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { TranslationTrainingStore } from '../../store/translation-training.store';

@Component({
  selector: 'app-translation-training-response',
  templateUrl: './translation-training-response.component.html',
  styleUrls: ['./translation-training-response.component.scss'],
})
export class TranslationTrainingResponseComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  response$: Observable<string[]> = this.trainingStore.step$.pipe(map((step) => step.response));
  propositions$: Observable<string[]> = this.trainingStore.step$.pipe(
    map((step) => step.propositions),
  );

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly trainingStore: TranslationTrainingStore,
  ) {}

  ngOnInit(): void {}

  addToResponse(word: string) {
    this.trainingStore.addToResponse(word);
  }

  removeToResponse(word: string) {
    this.trainingStore.removeFromResponse(word);
  }
}
