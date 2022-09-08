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

export function uniqueEmailValidator(usersService: UsersHttpService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (control.pristine) {
      return of(null);
    }

    return control.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((email) => checkIfEmailExists(email, usersService)),
      map((isUsed) => (isUsed ? { uniqueEmail: true } : null)),
      first(),
    );
  };
}

function checkIfEmailExists(email: string, usersService: UsersHttpService): Observable<boolean> {
  return usersService.emailExists(email).pipe(catchError(() => of(false)));
}
