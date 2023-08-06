import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import {
  GetExerciseResponseDto,
  StudentHttpService,
} from '../../../clients/dz-dialect-training-api';
import { map, switchMap, tap } from 'rxjs';
import { ThemeService } from '../../core/theme/theme.service';

type TrainPageState = {
  exerciseList: GetExerciseResponseDto[];
  toolbarColor: string;
};

@Injectable()
export class TrainPageStore extends ComponentStore<TrainPageState> {
  readonly exerciseList$ = this.select((state) => state.exerciseList);
  readonly toolbarColor$ = this.select((state) => state.toolbarColor);

  constructor(
    private readonly _studentHttpService: StudentHttpService,
    private readonly _theme: ThemeService,
  ) {
    super({
      exerciseList: [],
      toolbarColor: '',
    });
  }

  readonly getExerciseList = this.effect<void>((trigger$) =>
    trigger$.pipe(
      switchMap(() => this._studentHttpService.getExerciseList()),
      tap((exerciseList) => this.patchState({ exerciseList })),
      tap(() => this.setToolbarColor(this.get().exerciseList[0].courses[0].color)),
    ),
  );

  readonly setToolbarColor = this.effect<string>((color$) =>
    color$.pipe(
      map((color) => (this._theme.themeMode$.value === 'dark' ? '#202F36' : color)),
      tap((color) => this.patchState({ toolbarColor: color })),
      tap((color) => this._theme.updateStatusBarColor(color)),
    ),
  );
}
