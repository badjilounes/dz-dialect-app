import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { TrainingService } from '../../training.service';

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

  get sentence(): string {
    return this.trainingService.sentences?.[this.trainingService.step]?.dz || '';
  }

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly trainingService: TrainingService,
  ) {}

  ngOnInit(): void {}
}
