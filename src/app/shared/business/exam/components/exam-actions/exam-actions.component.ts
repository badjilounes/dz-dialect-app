import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { UntilDestroy } from '@ngneat/until-destroy';
import { LetModule } from '@ngrx/component';
import { TranslateModule } from '@ngx-translate/core';
import { map, Observable, shareReplay } from 'rxjs';
import { ExamStore } from '../../store/exam.store';

@UntilDestroy()
@Component({
  selector: 'app-exam-actions',
  templateUrl: './exam-actions.component.html',
  styleUrls: ['./exam-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    MatBottomSheetModule,
    MatButtonModule,
    LetModule,
    MatProgressSpinnerModule,
  ],
})
export class ExamActionsComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  loading$: Observable<boolean> = this.examStore.isLoading$;

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly examStore: ExamStore,
  ) {}

  skip(): void {
    this.examStore.skipQuestion();
  }

  validate(): void {
    this.examStore.validateQuestion();
  }
}
