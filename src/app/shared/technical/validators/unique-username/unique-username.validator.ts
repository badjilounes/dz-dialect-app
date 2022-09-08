import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  first,
  map,
  Observable,
  of,
  switchMap,
} from 'rxjs';
import { UsersHttpService } from 'src/clients/dz-dialect-identity-api';

export function uniqueUsernameValidator(usersService: UsersHttpService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (control.pristine) {
      return of(null);
    }

    return control.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((name) => checkIfUsernameExists(name, usersService)),
      map((isUsed) => (isUsed ? { uniqueUsername: true } : null)),
      first(),
    );
  };
}

function checkIfUsernameExists(name: string, usersService: UsersHttpService): Observable<boolean> {
  return usersService.usernameExists(name).pipe(catchError(() => of(false)));
}
