import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { TrainingStore } from '../../store/training.store';

@Component({
  selector: 'app-training-progress',
  templateUrl: './training-progress.component.html',
  styleUrls: ['./training-progress.component.scss'],
})
export class TrainingProgressComponent implements OnInit {
  progress$: Observable<number> = this.trainingStore.progress$;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly trainingStore: TrainingStore,
  ) {}

  ngOnInit(): void {}
}
