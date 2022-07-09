import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { TranslationTrainingStore } from '../../store/translation-training.store';

@Component({
  selector: 'app-translation-training-question',
  templateUrl: './translation-training-question.component.html',
  styleUrls: ['./translation-training-question.component.scss'],
})
export class TranslationTrainingQuestionComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  question$: Observable<string> = this.trainingStore.step$.pipe(map((step) => step.question));

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly trainingStore: TranslationTrainingStore,
  ) {}

  ngOnInit(): void {}
}
