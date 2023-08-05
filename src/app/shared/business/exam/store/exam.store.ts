import { EventEmitter, Injectable } from '@angular/core';
import { ComponentStore, OnStateInit } from '@ngrx/component-store';
import { Observable, catchError, map, of, switchMap, tap } from 'rxjs';
import {
  ExamCopyStateEnum,
  GetExamCopyResponseDto,
  GetExamQuestionResponseDto,
  StudentHttpService,
  ValidateResponseResponseDto,
} from '../../../../../clients/dz-dialect-training-api';
import { filterUndefinedValues } from '../../../technical/operators/filter-undefined-values.operator';

export enum ExamDisplay {
  LOADER,
  EXAM,
  RESULT,
}

type ExamState = {
  display: ExamDisplay;
  examId: string;
  resumeable: boolean;
  isLoading: boolean;
  propositions: string[];
  response: string[];
  currentQuestionIndex: number;
  examCopy?: GetExamCopyResponseDto;
  question?: GetExamQuestionResponseDto;
};

@Injectable()
export class ExamStore extends ComponentStore<ExamState> implements OnStateInit {
  readonly examCopy$: Observable<GetExamCopyResponseDto | undefined> = this.select(
    (state) => state.examCopy,
  );
  readonly propositions$: Observable<string[]> = this.select((state) => state.propositions);
  readonly question$: Observable<GetExamQuestionResponseDto | undefined> = this.select(
    (state) => state.question,
  );
  readonly response$: Observable<string[]> = this.select((state) => state.response);

  readonly isLoading$: Observable<boolean> = this.select((state) => state.isLoading);
  readonly display$: Observable<ExamDisplay> = this.select((state) => state.display);

  readonly progress$: Observable<number | undefined> = this.select(
    (state) =>
      ((state.currentQuestionIndex + 1) * 100) /
      (state.examCopy?.questions.length ?? state.currentQuestionIndex + 1),
  );

  readonly examSkipped: EventEmitter<void> = new EventEmitter<void>();
  readonly examCompleted: EventEmitter<void> = new EventEmitter<void>();
  readonly responseValidated: EventEmitter<ValidateResponseResponseDto> =
    new EventEmitter<ValidateResponseResponseDto>();

  constructor(private readonly studentHttpService: StudentHttpService) {
    super();
  }

  ngrxOnStateInit(): void {
    const { examId, resumeable: resume } = this.get();

    this.patchState({ isLoading: true, display: ExamDisplay.LOADER });

    const examCopySource$: Observable<GetExamCopyResponseDto> = !resume
      ? this.studentHttpService.startExam({ examId })
      : this.studentHttpService.getExamCopy(examId).pipe(
          switchMap((copy) =>
            copy.state === ExamCopyStateEnum.COMPLETED
              ? this.studentHttpService.startExam({ examId })
              : of(copy),
          ),
          catchError(() => this.studentHttpService.startExam({ examId })),
        );

    examCopySource$
      .pipe(
        tap((examCopy: GetExamCopyResponseDto) =>
          this.patchState({
            examCopy,
            currentQuestionIndex: examCopy.currentQuestionIndex,
            question: examCopy.questions[examCopy.currentQuestionIndex],
            propositions: examCopy.questions[examCopy.currentQuestionIndex].propositions,
            isLoading: false,
            display: ExamDisplay.EXAM,
          }),
        ),
      )
      .subscribe();
  }

  readonly skipExam = this.effect((save$: Observable<void>) => {
    return save$.pipe(tap(() => this.examSkipped.emit()));
  });

  readonly addToResponse = this.effect((save$: Observable<string>) => {
    return save$.pipe(
      tap((word: string) => {
        this.patchState((state) => ({
          response: [...state.response, word],
          propositions: this.removeFrom(state.propositions, word),
        }));
      }),
    );
  });

  readonly removeFromResponse = this.effect((save$: Observable<string>) => {
    return save$.pipe(
      tap((word: string) => {
        this.patchState((state) => ({
          response: this.removeFrom(state.response, word),
          propositions: [...state.propositions, word],
        }));
      }),
    );
  });

  readonly skipQuestion = this.effect((save$: Observable<void>) => {
    return save$.pipe(
      tap(() => this.patchState({ isLoading: true })),
      map(() => ({ examCopyId: this.get().examCopy?.id, questionId: this.get().question?.id })),
      filterUndefinedValues(),
      switchMap(({ examCopyId, questionId }) =>
        this.studentHttpService.validateResponse({
          examCopyId,
          questionId,
          response: [],
        }),
      ),
      tap((response: ValidateResponseResponseDto) => this.responseValidated.emit(response)),
      tap(() => this.patchState({ isLoading: false })),
    );
  });

  readonly validateQuestion = this.effect((save$: Observable<void>) => {
    return save$.pipe(
      tap(() => this.patchState({ isLoading: true })),
      map(() => ({ examCopyId: this.get().examCopy?.id, questionId: this.get().question?.id })),
      filterUndefinedValues(),
      switchMap(({ examCopyId, questionId }) =>
        this.studentHttpService.validateResponse({
          examCopyId,
          questionId,
          response: this.get().response,
        }),
      ),
      tap((response: ValidateResponseResponseDto) => this.responseValidated.emit(response)),
      tap(() => this.patchState({ isLoading: false })),
    );
  });

  readonly nextQuestion = (response: ValidateResponseResponseDto): void => {
    if (response.examCopyState === ExamCopyStateEnum.COMPLETED) {
      this.examCompleted.emit();
      this.patchState({ display: ExamDisplay.RESULT });
    } else {
      const { examCopy } = this.get();
      this.patchState({
        currentQuestionIndex: response.nextQuestionIndex,
        question: examCopy?.questions[response.nextQuestionIndex],
        propositions: examCopy?.questions[response.nextQuestionIndex].propositions,
        response: [],
      });
    }
  };

  private removeFrom(array: string[], item: string): string[] {
    const index = array.indexOf(item);
    array.splice(index, 1);
    return array;
  }
}
