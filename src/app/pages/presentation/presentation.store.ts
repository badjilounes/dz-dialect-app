import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UntilDestroy } from '@ngneat/until-destroy';
import { ComponentStore } from '@ngrx/component-store';
import { catchError, EMPTY, map, Observable, switchMap, tap } from 'rxjs';
import { GuestIdService } from 'src/app/core/guest/guest-id.service';
import { filterUndefined } from 'src/app/shared/technical/operators/filter-undefined.operator';
import { GetTrainingExamResponseDto, GetTrainingResponseDto, GetTrainingResultResponseDto, StudentHttpService } from 'src/clients/dz-dialect-training-api';
import { PresentationDisplay } from './presentation-display';

type TrainingState = {
  display: PresentationDisplay;
  isLoading: boolean;
  presentation?: GetTrainingResponseDto;
  result?: GetTrainingResultResponseDto;
};

@UntilDestroy()
@Injectable()
export class PresentationStore extends ComponentStore<TrainingState> {
  readonly isLoading$: Observable<boolean> = this.select((state) => state.isLoading);

  readonly showResult$: Observable<boolean> = this.select((state) => state.display === PresentationDisplay.RESULT);
  readonly showTraining$: Observable<boolean> = this.select((state) => state.display === PresentationDisplay.TRAINING);

  readonly exam$: Observable<GetTrainingExamResponseDto> = this.select((state) => state.presentation).pipe(filterUndefined(), map((presentation) => presentation.exam));
  readonly result$: Observable<GetTrainingResultResponseDto> = this.select((state) => state.result).pipe(filterUndefined());

  constructor(
    private readonly studentHttpService: StudentHttpService,
    private readonly guestIdService: GuestIdService,
    private readonly snackBar: MatSnackBar,
  ) {
    super({
      display: PresentationDisplay.TRAINING,
      isLoading: false,
    });
  }

  cancelTraining() {
    throw new Error('Not implemented');
  }

  readonly getResults = this.effect((save$: Observable<void>) => {
    return save$.pipe(
      tap(() => this.patchState(() => ({ isLoading: true }))),
      switchMap(() => this.studentHttpService.getPresentationResult(this.guestIdService.guestId)),
      tap((result: GetTrainingResultResponseDto) => {
        this.patchState(() => ({
          display: PresentationDisplay.RESULT,
          isLoading: false,
          result,
        }));
      }),
      catchError((error) => {
        this.patchState(() => ({ isLoading: false }));
        this.snackBar.open(error.message, 'OK', { duration: 3000 });
        return EMPTY;
      }),
    );
  });

  readonly getPresentation = this.effect((save$: Observable<void>) => {
    return save$.pipe(
      tap(() => this.patchState(() => ({ isLoading: true }))),
      switchMap(() => this.studentHttpService.getTrainingPresentation()),
      tap((presentation: GetTrainingResponseDto) => {
        this.patchState(() => ({
          display: PresentationDisplay.TRAINING,
          presentation,
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
}
