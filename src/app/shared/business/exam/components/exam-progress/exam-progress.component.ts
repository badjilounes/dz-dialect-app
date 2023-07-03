import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { LetModule } from '@ngrx/component';
import { map, Observable, shareReplay } from 'rxjs';
import { ExamStore } from '../../store/exam.store';

@Component({
  selector: 'app-exam-progress',
  templateUrl: './exam-progress.component.html',
  styleUrls: ['./exam-progress.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    MatTooltipModule,
    MatIconModule,
    MatProgressBarModule,
    LetModule,
    MatButtonModule,
  ],
})
export class ExamProgressComponent {
  @Input() cancelOption = false;
  @Input() cancelOptionTooltip = '';

  progress$: Observable<number> = this.examStore.progress$;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly examStore: ExamStore,
  ) {}

  cancel(): void {
    this.examStore.skipExam();
  }
}
