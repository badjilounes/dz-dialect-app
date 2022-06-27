import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { TrainingStore } from '../../store/training.store';

@Component({
  selector: 'app-training-response',
  templateUrl: './training-response.component.html',
  styleUrls: ['./training-response.component.scss'],
})
export class TrainingResponseComponent implements OnInit {
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
    private readonly trainingStore: TrainingStore,
  ) {}

  ngOnInit(): void {}

  addToResponse(word: string) {
    this.trainingStore.addToResponse(word);
  }

  removeToResponse(word: string) {
    this.trainingStore.removeFromResponse(word);
  }
}
