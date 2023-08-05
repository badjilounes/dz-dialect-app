import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { LetModule } from '@ngrx/component';
import { TranslateModule } from '@ngx-translate/core';
import { map, Observable, shareReplay, tap } from 'rxjs';
import { ExamActionsComponent } from './components/exam-actions/exam-actions.component';
import { ExamProgressComponent } from './components/exam-progress/exam-progress.component';
import { ExamQuestionComponent } from './components/exam-question/exam-question.component';
import { ExamResponseComponent } from './components/exam-response/exam-response.component';
import { ExamDisplay, ExamStore } from './store/exam.store';
import { ValidateResponseResponseDto } from '../../../../clients/dz-dialect-training-api';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ExamResultComponent } from './components/exam-result/exam-result.component';
import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material/bottom-sheet';
import { provideComponentStore } from '@ngrx/component-store';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';

@UntilDestroy()
@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    LetModule,
    ExamProgressComponent,
    ExamQuestionComponent,
    ExamResponseComponent,
    ExamActionsComponent,
    MatDividerModule,
    MatProgressSpinnerModule,
    TranslateModule,
  ],
  providers: [provideComponentStore(ExamStore)],
})
export class ExamComponent implements OnInit {
  @Input() examId!: string;
  @Input() skipable = false;
  @Input() resumeable = true;

  @Output() completed: EventEmitter<void> = new EventEmitter<void>();
  @Output() skipped: EventEmitter<void> = new EventEmitter<void>();

  isHandset$: Observable<boolean> = this._breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  showLoader$ = this._store.display$.pipe(map((display) => display === ExamDisplay.LOADER));

  constructor(
    private readonly _breakpointObserver: BreakpointObserver,
    private readonly _store: ExamStore,
    private readonly _bottomSheet: MatBottomSheet,
  ) {
    this.completed = this._store.examCompleted;
    this.skipped = this._store.examSkipped;
  }

  ngOnInit(): void {
    this._store.setState({
      examId: this.examId,
      resumeable: this.resumeable,
      display: ExamDisplay.LOADER,
      isLoading: false,
      currentQuestionIndex: 0,
      propositions: [],
      response: [],
    });

    this._store.responseValidated.pipe(untilDestroyed(this)).subscribe((responseValidationData) => {
      const bottomSheetConfiguration: MatBottomSheetConfig<ValidateResponseResponseDto> = {
        data: responseValidationData,
        disableClose: true,
        panelClass: ['step-result', responseValidationData.valid ? 'success' : 'failure'],
      };

      const bottomSheetRef = this._bottomSheet.open(ExamResultComponent, bottomSheetConfiguration);

      bottomSheetRef
        .afterDismissed()
        .pipe(
          tap(() => this._store.nextQuestion(responseValidationData)),
          untilDestroyed(this),
        )
        .subscribe();
    });
  }
}
