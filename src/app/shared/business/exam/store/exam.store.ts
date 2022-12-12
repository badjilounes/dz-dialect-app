import { EventEmitter, Injectable } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ComponentStore } from '@ngrx/component-store';
import { map, Observable, switchMap, tap } from 'rxjs';
import {
  GetTrainingExamQuestionResponseDto,
  GetTrainingExamResponseDto,
  StudentHttpService,
  ValidateResponseDto,
} from '../../../../../clients/dz-dialect-training-api';
import { GuestIdService } from '../../../../core/guest/guest-id.service';
import { ExamResultComponent } from '../components/exam-result/exam-result.component';

type ExamState = {
  trainingId: string;
  exam: GetTrainingExamResponseDto;
  propositions: string[];
  question: GetTrainingExamQuestionResponseDto;
  response: string[];
  isLoading: boolean;
};

@Injectable()
export class ExamStore extends ComponentStore<ExamState> {
  readonly exam$: Observable<GetTrainingExamResponseDto | undefined> = this.select(
    (state) => state.exam,
  );
  readonly propositions$: Observable<string[]> = this.select((state) => state.propositions);
  readonly question$: Observable<GetTrainingExamQuestionResponseDto | undefined> = this.select(
    (state) => state.question,
  );
  readonly response$: Observable<string[]> = this.select((state) => state.response);

  readonly isLoading$: Observable<boolean> = this.select((state) => state.isLoading);

  readonly progress$: Observable<number> = this.select(
    (state) => ((state.question?.order || 0) * 100) / (state.exam?.questions.length || 10),
  );

  readonly examCanceled: EventEmitter<void> = new EventEmitter<void>();
  readonly examCompleted: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private readonly bottomSheet: MatBottomSheet,
    private readonly studentHttpService: StudentHttpService,
    private readonly guestIdService: GuestIdService,
  ) {
    super();
  }

  readonly cancelExam = this.effect((save$: Observable<void>) => {
    return save$.pipe(tap(() => this.examCanceled.emit()));
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

  readonly validate = this.effect((save$: Observable<void>) => {
    return save$.pipe(
      tap(() => this.patchState({ isLoading: true })),
      switchMap(() =>
        this.studentHttpService.validatePresentation(
          {
            trainingId: this.get().trainingId,
            examId: this.get().exam.id,
            questionId: this.get().question.id,
            response: this.get().response,
          },
          this.guestIdService.guestId,
        ),
      ),
      tap(({ answer, valid }: ValidateResponseDto) => this.showQuestionResult({ answer, valid })),
      tap(() => this.patchState({ isLoading: false })),
    );
  });

  readonly showQuestionResult = this.effect(
    (save$: Observable<{ valid: boolean; answer: string }>) => {
      return save$.pipe(
        map(({ valid, answer }) =>
          this.bottomSheet.open(ExamResultComponent, {
            data: { valid, answer },
            disableClose: true,
            panelClass: ['step-result', valid ? 'success' : 'failure'],
          }),
        ),
        switchMap((bottomSheetRef) => bottomSheetRef.afterDismissed()),
        tap(() => {
          if (this.get().question.order === this.get().exam.questions.length) {
            this.examCompleted.emit();
          } else {
            this.patchState((state) => {
              const question = state.exam.questions[state.question.order];
              return {
                question: question,
                response: [],
                propositions: question.propositions,
              };
            });
          }
        }),
      );
    },
  );

  private removeFrom(array: string[], item: string): string[] {
    const index = array.indexOf(item);
    array.splice(index, 1);
    return array;
  }
}
