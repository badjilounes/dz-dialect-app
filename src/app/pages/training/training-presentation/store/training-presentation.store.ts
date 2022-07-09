import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ComponentStore, OnStoreInit } from '@ngrx/component-store';
import { catchError, EMPTY, Observable, switchMap, tap } from 'rxjs';
import { StorageService } from 'src/app/shared/technical/storage/storage.service';
import { SentenceControllerHttpService, SentenceDTO } from 'src/clients/dz-dialect-api';
import { TrainingDisplay } from '../models/training-display';

type TrainingState = {
  display: TrainingDisplay;
  sentences: SentenceDTO[];
  stepsCount: number;
  isLoading: boolean;
};

@Injectable()
@UntilDestroy()
export class TrainingPresentationStore
  extends ComponentStore<TrainingState>
  implements OnStoreInit
{
  readonly display$: Observable<TrainingDisplay> = this.select((state) => state.display);
  readonly sentences$: Observable<SentenceDTO[]> = this.select((state) => state.sentences);
  readonly isLoading$: Observable<boolean> = this.select((state) => state.isLoading);

  constructor(
    private readonly sentenceApi: SentenceControllerHttpService,
    private readonly snackBar: MatSnackBar,
    private readonly storageService: StorageService,
  ) {
    super({
      display: storageService.tryGet('training-display') || TrainingDisplay.HOME,
      stepsCount: storageService.tryGet('training-steps-count') || 10,
      sentences: storageService.tryGet('training-sentences') || [],
      isLoading: false,
    });
  }

  ngrxOnStoreInit() {
    this.state$
      .pipe(
        tap(({ display }) => this.storageService.set('training-display', display)),
        tap(({ stepsCount }) => this.storageService.set('training-steps-count', stepsCount)),
        tap(({ sentences }) => this.storageService.set('training-sentences', sentences)),
        untilDestroyed(this),
      )
      .subscribe();
  }

  readonly startTraining = this.effect((save$: Observable<void>) => {
    return save$.pipe(
      tap(() => this.patchState(() => ({ isLoading: true }))),
      switchMap(() => this.sentenceApi.generateRandomSentence(this.get().stepsCount)),
      tap((sentences: SentenceDTO[]) => {
        this.patchState(() => ({
          display: TrainingDisplay.TRAINING,
          sentences,
          isLoading: false,
        }));
      }),
      catchError((error) => {
        this.patchState(() => ({ isLoading: false }));
        this.snackBar.open(error.message, 'OK', { duration: 3000 });
        return EMPTY;
      }),
    );
  });

  showTrainingResults() {
    this.patchState(() => ({ display: TrainingDisplay.RESULT }));
  }
}
