import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { TrainingStore } from '../../store/training.store';

@Component({
  selector: 'app-training-question',
  templateUrl: './training-question.component.html',
  styleUrls: ['./training-question.component.scss'],
})
export class TrainingQuestionComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  question$: Observable<string> = this.trainingStore.step$.pipe(map((step) => step.question));

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly trainingStore: TrainingStore,
  ) {}

  ngOnInit(): void {}
}
