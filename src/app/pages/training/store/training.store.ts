import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ComponentStore, OnStoreInit } from '@ngrx/component-store';
import { catchError, EMPTY, Observable, switchMap, tap } from 'rxjs';
import { StorageService } from 'src/app/shared/technical/storage/storage.service';
import { SentenceControllerHttpService, SentenceDTO } from 'src/clients/dz-dialect-api';
import { TrainingDisplay } from '../models/training-display';
import { TrainingLanguage } from '../models/training-language';
import { EMPTY_RESULT, TrainingResult } from '../models/training-result';
import { EMPTY_STEP, TrainingStep } from '../models/training-step';

type TrainingState = {
  display: TrainingDisplay;
  sentences: SentenceDTO[];
  stepsCount: number;
  step: TrainingStep;
  result: TrainingResult;
  language: TrainingLanguage;
  isLoading: boolean;
};

@Injectable()
@UntilDestroy()
export class TrainingStore extends ComponentStore<TrainingState> implements OnStoreInit {
  readonly display$: Observable<TrainingDisplay> = this.select((state) => state.display);
  readonly step$: Observable<TrainingStep> = this.select((state) => state.step);
  readonly result$: Observable<TrainingResult> = this.select((state) => state.result);
  readonly sentences$: Observable<SentenceDTO[]> = this.select((state) => state.sentences);
  readonly stepsCount$: Observable<number> = this.select((state) => state.stepsCount);
  readonly note$: Observable<number> = this.select((state) => state.result.note);
  readonly isLoading$: Observable<boolean> = this.select((state) => state.isLoading);

  readonly progress$: Observable<number> = this.select(
    (state) => ((state.step.index + 1) * 100) / state.stepsCount,
  );
  readonly isResponseCorrect$: Observable<boolean> = this.select(
    (state) => state.step.answer.replace(/ /g, '') === state.step.response.join().replace(/,/g, ''),
  );

  constructor(
    private readonly sentenceApi: SentenceControllerHttpService,
    private readonly snackBar: MatSnackBar,
    private readonly storageService: StorageService,
  ) {
    super({
      display: storageService.tryGet('training-display') || TrainingDisplay.HOME,
      language: storageService.tryGet('training-language') || { question: 'fr', response: 'dz' },
      stepsCount: storageService.tryGet('training-steps-count') || 10,
      step: storageService.tryGet('training-step') || EMPTY_STEP,
      sentences: storageService.tryGet('training-sentences') || [],
      result: storageService.tryGet('training-result') || EMPTY_RESULT,
      isLoading: false,
    });
  }

  ngrxOnStoreInit() {
    this.state$
      .pipe(
        tap(({ display }) => this.storageService.set('training-display', display)),
        tap(({ language }) => this.storageService.set('training-language', language)),
        tap(({ stepsCount }) => this.storageService.set('training-steps-count', stepsCount)),
        tap(({ step }) => this.storageService.set('training-step', step)),
        tap(({ sentences }) => this.storageService.set('training-sentences', sentences)),
        tap(({ result }) => this.storageService.set('training-result', result)),
        untilDestroyed(this),
      )
      .subscribe((state) => console.log(state));
  }

  readonly startTraining = this.effect((save$: Observable<void>) => {
    return save$.pipe(
      tap(() => this.patchState(() => ({ isLoading: true }))),
      switchMap(() => this.sentenceApi.generateRandomSentence(this.get().stepsCount)),
      tap((sentences: SentenceDTO[]) => {
        this.patchState(() => ({
          display: TrainingDisplay.TRAINING,
          result: EMPTY_RESULT,
          sentences,
          isLoading: false,
        }));
      }),
      tap(() => this.setupStep(0)),
      catchError((error) => {
        this.patchState(() => ({ isLoading: false }));
        this.snackBar.open(error.message, 'OK', { duration: 3000 });
        return EMPTY;
      }),
    );
  });

  readonly nextStep = this.effect((save$: Observable<void>) => {
    return save$.pipe(
      tap(() => this.updateResult()),
      tap(() => {
        const { step, stepsCount } = this.get();
        if (step.index + 1 === stepsCount) {
          this.patchState(() => ({ display: TrainingDisplay.RESULT }));
        } else {
          this.setupStep(step.index + 1);
        }
      }),
    );
  });

  readonly addToResponse = this.effect((save$: Observable<string>) => {
    return save$.pipe(
      tap((word: string) => {
        const { step } = this.get();
        this.patchState({
          step: {
            ...step,
            response: [...step.response, word],
            propositions: this.removeFrom(step.propositions, word),
          },
        });
      }),
    );
  });

  readonly removeFromResponse = this.effect((save$: Observable<string>) => {
    return save$.pipe(
      tap((word: string) => {
        const { step } = this.get();
        this.patchState({
          step: {
            ...step,
            response: this.removeFrom(step.response, word),
            propositions: [...step.propositions, word],
          },
        });
      }),
    );
  });

  private readonly setupStep = this.effect((save$: Observable<number>) => {
    return save$.pipe(
      tap((index: number) => {
        const { sentences, language } = this.get();
        this.patchState({
          step: {
            index,
            question: sentences[index]?.[language.response] ?? '',
            answer: sentences[index]?.[language.question] ?? '',
            propositions: sentences[index]?.word_propositions?.[language.question] ?? [],
            response: [],
          },
        });
      }),
    );
  });

  private readonly updateResult = this.effect((save$: Observable<void>) => {
    return save$.pipe(
      switchMap(() => this.isResponseCorrect$),
      tap((isResponseCorrect) => {
        const { step, result } = this.get();
        this.patchState({
          result: {
            history: [...result.history, step],
            note: result.note + (isResponseCorrect ? 1 : 0),
          },
        });
      }),
    );
  });

  private removeFrom(array: string[], item: string): string[] {
    const index = array.indexOf(item);
    array.splice(index, 1);
    return array;
  }
}
