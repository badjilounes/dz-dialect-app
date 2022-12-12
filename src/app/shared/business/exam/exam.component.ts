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
import { map, Observable, shareReplay } from 'rxjs';
import {
  GetTrainingExamResponseDto,
  GetTrainingResponseDto,
} from 'src/clients/dz-dialect-training-api';
import { ExamActionsComponent } from './components/exam-actions/exam-actions.component';
import { ExamProgressComponent } from './components/exam-progress/exam-progress.component';
import { ExamQuestionComponent } from './components/exam-question/exam-question.component';
import { ExamResponseComponent } from './components/exam-response/exam-response.component';
import { ExamStore } from './store/exam.store';

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
  @Input() training!: GetTrainingResponseDto;
  @Input() exam!: GetTrainingExamResponseDto;
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
  ) {
    this.completed = this.examStore.examCompleted;
    this.skipped = this.examStore.examSkipped;
  }

  ngOnInit(): void {
    this.examStore.setState({
      trainingId: this.training.id,
      exam: this.exam,
      propositions: this.exam.questions[0].propositions,
      question: this.exam.questions[0],
      response: [],
      isLoading: false,
    });
  }
}
