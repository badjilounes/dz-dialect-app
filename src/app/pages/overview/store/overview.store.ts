import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable, repeat, switchMap, tap } from 'rxjs';
import { filterUndefined } from 'src/app/shared/technical/operators/filter-undefined.operator';
import {
  GetExamResultResponseDto,
  GetPresentationExamIdResponseDto,
  StudentHttpService,
} from 'src/clients/dz-dialect-training-api';
import { OverviewDisplay } from '../overview-display';

type OverviewState = {
  display: OverviewDisplay;
  isLoading: boolean;
  presentationExamId?: string;
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

  readonly presentationExamId$: Observable<string> = this.select(
    (state) => state.presentationExamId,
  ).pipe(filterUndefined());

  readonly result$: Observable<GetExamResultResponseDto> = this.select(
    (state) => state.result,
  ).pipe(filterUndefined());

  constructor(
    private readonly studentHttpService: StudentHttpService,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router,
  ) {
    super({
      display: OverviewDisplay.OVERVIEW,
      isLoading: false,
    });
  }
  readonly getExamResultsFromExamId = this.effect((examId$: Observable<string>) => {
    return examId$.pipe(
      tap(() => this.patchState(() => ({ isLoading: true, display: OverviewDisplay.LOADER }))),
      switchMap((examId) => this.studentHttpService.getExamResult(examId)),
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
      switchMap(() => this.studentHttpService.getPresentationExamId()),
      tapResponse(
        ({ examId }: GetPresentationExamIdResponseDto) => {
          this.patchState(() => ({
            display: OverviewDisplay.PRESENTATION,
            presentationExamId: examId,
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

  readonly skipPresentation = this.effect((source$: Observable<void>) => {
    return source$.pipe(
      tap(() => this.patchState(() => ({ isLoading: true }))),
      switchMap(() => this.studentHttpService.skipPresentation()),
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
