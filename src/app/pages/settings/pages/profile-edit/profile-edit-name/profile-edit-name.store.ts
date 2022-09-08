import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ComponentStore, OnStoreInit } from '@ngrx/component-store';
import { catchError, EMPTY, Observable, switchMap, tap } from 'rxjs';
import { AppStore } from 'src/app/app.store';
import { UsersHttpService } from 'src/clients/dz-dialect-identity-api';

type ProfileEditNameState = {
  name: string;
};

@Injectable({
  providedIn: 'root',
})
export class ProfileEditNameStore
  extends ComponentStore<ProfileEditNameState>
  implements OnStoreInit
{
  readonly name$: Observable<string> = this.select((state) => state.name);

  constructor(
    private readonly usersHttpService: UsersHttpService,
    private readonly snackBar: MatSnackBar,
    private readonly appStore: AppStore,
    private readonly router: Router,
  ) {
    super({
      name: '',
    });
  }

  ngrxOnStoreInit() {
    this.usersHttpService
      .getConnectedUser()
      .pipe(tap((user) => this.patchState({ name: user.name })))
      .subscribe();
  }

  undoChanges = this.effect((save$: Observable<void>) => {
    return save$.pipe(
      tap(() => {
        const name = this.get().name;
        this.patchState(() => ({ name: '' }));
        this.patchState(() => ({ name }));
      }),
    );
  });

  saveChanges = this.effect((save$: Observable<string>) => {
    return save$.pipe(
      switchMap((name) => this.usersHttpService.updateName({ name })),
      tap((user) => {
        this.appStore.initStore();
        this.patchState(() => ({ name: user.name }));
        this.snackBar.open('Nom modifié', 'OK', { duration: 2000 });
        this.router.navigate(['/settings/profile']);
      }),
      catchError((error) => {
        this.snackBar.open(error.error.message, 'OK', { duration: 2000 });
        return EMPTY;
      }),
    );
  });
}
