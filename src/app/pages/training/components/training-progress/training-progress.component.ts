import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { TrainingService } from '../../training.service';

@Component({
  selector: 'app-training-progress',
  templateUrl: './training-progress.component.html',
  styleUrls: ['./training-progress.component.scss'],
})
export class TrainingProgressComponent implements OnInit {
  get value(): number {
    return ((this.trainingService.step + 1) * 100) / this.trainingService.nbSteps;
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly trainingService: TrainingService,
  ) {}

  ngOnInit(): void {}
}
