import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable, repeat, switchMap, tap } from 'rxjs';
import { GuestIdService } from 'src/app/core/guest/guest-id.service';
import { filterUndefined } from 'src/app/shared/technical/operators/filter-undefined.operator';
import {
  GetExamResponseDto,
  GetExamResultResponseDto,
  StudentHttpService,
} from 'src/clients/dz-dialect-training-api';
import { OverviewDisplay } from '../overview-display';

type OverviewState = {
  display: OverviewDisplay;
  isLoading: boolean;
  presentation?: GetExamResponseDto;
  result?: GetExamResultResponseDto;
};

@UntilDestroy()
@Injectable()
export class OverviewStore extends ComponentStore<OverviewState> {
  readonly isLoading$: Observable<boolean> = this.select((state) => state.isLoading);

  readonly showOverview$: Observable<boolean> = this.select(
    (state) => state.display === OverviewDisplay.OVERVIEW,
  );
  readonly showResult$: Observable<boolean> = this.select(
    (state) => state.display === OverviewDisplay.RESULT,
  );
  readonly showPresentation$: Observable<boolean> = this.select(
    (state) => state.display === OverviewDisplay.PRESENTATION,
  );
  readonly showLoader$: Observable<boolean> = this.select(
    (state) => state.display === OverviewDisplay.LOADER,
  );

  readonly presentation$: Observable<GetExamResponseDto> = this.select(
    (state) => state.presentation,
  ).pipe(filterUndefined());

  readonly result$: Observable<GetExamResultResponseDto> = this.select(
    (state) => state.result,
  ).pipe(filterUndefined());

  constructor(
    private readonly studentHttpService: StudentHttpService,
    private readonly guestIdService: GuestIdService,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router,
  ) {
    super({
      display: OverviewDisplay.OVERVIEW,
      isLoading: false,
    });
  }
  readonly getResults = this.effect((examId$: Observable<string>) => {
    return examId$.pipe(
      tap(() => this.patchState(() => ({ isLoading: true, display: OverviewDisplay.LOADER }))),
      switchMap((examId) =>
        this.studentHttpService.getExamResult(examId, this.guestIdService.guestId),
      ),
      tapResponse(
        (result: GetExamResultResponseDto) => {
          this.patchState(() => ({
            display: OverviewDisplay.RESULT,
            isLoading: false,
            result,
          }));
        },
        ({ error }: HttpErrorResponse) => {
          this.patchState(() => ({ isLoading: false }));
          this.snackBar.open(error.message, 'OK', { duration: 3000 });
        },
      ),
      repeat(),
    );
  });

  readonly startPresentation = this.effect((save$: Observable<void>) => {
    return save$.pipe(
      tap(() => this.patchState(() => ({ isLoading: true }))),
      switchMap(() => this.studentHttpService.startPresentation(this.guestIdService.guestId)),
      tapResponse(
        (presentation: GetExamResponseDto) => {
          this.patchState(() => ({
            display: OverviewDisplay.PRESENTATION,
            presentation,
            isLoading: false,
          }));
        },
        ({ error }: HttpErrorResponse) => {
          this.patchState(() => ({ isLoading: false }));
          this.snackBar.open(error.message, 'OK', { duration: 3000 });
        },
      ),
      repeat(),
    );
  });

  readonly skipPresentation = this.effect((presentationExamId$: Observable<string>) => {
    return presentationExamId$.pipe(
      tap(() => this.patchState(() => ({ isLoading: true }))),
      switchMap((examId) =>
        this.studentHttpService.skipExam({ examId }, this.guestIdService.guestId),
      ),
      tapResponse(
        () => this.router.navigate(['/train']),
        ({ error }: HttpErrorResponse) => {
          this.patchState(() => ({ isLoading: false }));
          this.snackBar.open(error.message, 'OK', { duration: 3000 });
        },
      ),
      repeat(),
    );
  });
}
