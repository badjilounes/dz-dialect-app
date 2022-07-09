import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { TranslationTrainingStore } from '../../store/translation-training.store';

@Component({
  selector: 'app-translation-training-progress',
  templateUrl: './translation-training-progress.component.html',
  styleUrls: ['./translation-training-progress.component.scss'],
})
export class TranslationTrainingProgressComponent implements OnInit {
  progress$: Observable<number> = this.trainingStore.progress$;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly trainingStore: TranslationTrainingStore,
  ) {}

  ngOnInit(): void {}
}
