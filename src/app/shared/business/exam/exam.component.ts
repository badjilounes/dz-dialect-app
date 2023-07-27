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
import { ExamStore } from './store/exam.store';
import {
  GetExamCopyResponseDto,
  ValidateResponseResponseDto,
} from '../../../../clients/dz-dialect-training-api';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ExamResultComponent } from './components/exam-result/exam-result.component';
import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material/bottom-sheet';

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
    TranslateModule,
  ],
  providers: [ExamStore],
})
export class ExamComponent implements OnInit {
  @Input() examCopy!: GetExamCopyResponseDto;
  @Input() skipOption = false;

  @Output() completed: EventEmitter<void> = new EventEmitter<void>();
  @Output() skipped: EventEmitter<void> = new EventEmitter<void>();

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly examStore: ExamStore,
    private readonly bottomSheet: MatBottomSheet,
  ) {
    this.completed = this.examStore.examCompleted;
    this.skipped = this.examStore.examSkipped;
  }

  ngOnInit(): void {
    this.examStore.setState({
      examCopy: this.examCopy,
      propositions: this.examCopy.questions[this.examCopy.currentQuestionIndex].propositions,
      question: this.examCopy.questions[this.examCopy.currentQuestionIndex],
      response: [],
      isLoading: false,
    });

    this.examStore.responseValidated
      .pipe(untilDestroyed(this))
      .subscribe((responseValidationData) => {
        const bottomSheetConfiguration: MatBottomSheetConfig<ValidateResponseResponseDto> = {
          data: responseValidationData,
          disableClose: true,
          panelClass: ['step-result', responseValidationData.valid ? 'success' : 'failure'],
        };

        const bottomSheetRef = this.bottomSheet.open(ExamResultComponent, bottomSheetConfiguration);

        bottomSheetRef
          .afterDismissed()
          .pipe(
            tap(() => this.examStore.nextQuestion(responseValidationData)),
            untilDestroyed(this),
          )
          .subscribe();
      });
  }
}
