import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const emailValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  return validateEmail(control.value) ? null : { email: true };
};

function validateEmail(email: string): boolean {
  if (!email) {
    return true;
  }
  return (
    email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    ) !== null
  );
}
