import { EventEmitter, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable, switchMap, tap } from 'rxjs';
import {
  ExamCopyStateEnum,
  GetExamCopyResponseDto,
  GetExamQuestionResponseDto,
  StudentHttpService,
  ValidateResponseResponseDto,
} from '../../../../../clients/dz-dialect-training-api';
import { GuestIdService } from '../../../../core/guest/guest-id.service';

type ExamState = {
  examCopy: GetExamCopyResponseDto;
  question: GetExamQuestionResponseDto;
  propositions: string[];
  response: string[];
  isLoading: boolean;
};

@Injectable()
export class ExamStore extends ComponentStore<ExamState> {
  readonly examCopy$: Observable<GetExamCopyResponseDto | undefined> = this.select(
    (state) => state.examCopy,
  );
  readonly propositions$: Observable<string[]> = this.select((state) => state.propositions);
  readonly question$: Observable<GetExamQuestionResponseDto | undefined> = this.select(
    (state) => state.question,
  );
  readonly response$: Observable<string[]> = this.select((state) => state.response);

  readonly isLoading$: Observable<boolean> = this.select((state) => state.isLoading);

  readonly progress$: Observable<number> = this.select(
    (state) => ((state.examCopy.currentQuestionIndex + 1) * 100) / state.examCopy.questions.length,
  );

  readonly examSkipped: EventEmitter<void> = new EventEmitter<void>();
  readonly examCompleted: EventEmitter<void> = new EventEmitter<void>();
  readonly responseValidated: EventEmitter<ValidateResponseResponseDto> =
    new EventEmitter<ValidateResponseResponseDto>();

  constructor(
    private readonly studentHttpService: StudentHttpService,
    private readonly guestIdService: GuestIdService,
  ) {
    super();
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
      switchMap(() =>
        this.studentHttpService.validateResponse(
          {
            examCopyId: this.get().examCopy.id,
            questionId: this.get().question.id,
            response: [],
          },
          this.guestIdService.guestId,
        ),
      ),
      tap((response: ValidateResponseResponseDto) => this.responseValidated.emit(response)),
      tap(() => this.patchState({ isLoading: false })),
    );
  });

  readonly validateQuestion = this.effect((save$: Observable<void>) => {
    return save$.pipe(
      tap(() => this.patchState({ isLoading: true })),
      switchMap(() =>
        this.studentHttpService.validateResponse(
          {
            examCopyId: this.get().examCopy.id,
            questionId: this.get().question.id,
            response: this.get().response,
          },
          this.guestIdService.guestId,
        ),
      ),
      tap((response: ValidateResponseResponseDto) => this.responseValidated.emit(response)),
      tap(() => this.patchState({ isLoading: false })),
    );
  });

  readonly nextQuestion = (response: ValidateResponseResponseDto): void => {
    if (response.examCopyState === ExamCopyStateEnum.COMPLETED) {
      this.examCompleted.emit();
    } else {
      const { examCopy } = this.get();
      this.patchState({
        question: examCopy.questions[response.nextQuestionIndex],
        propositions: examCopy.questions[response.nextQuestionIndex].propositions,
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
