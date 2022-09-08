import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { UsersHttpService } from 'src/clients/dz-dialect-identity-api';
import { emailValidator } from './email/email.validator';
import { uniqueEmailValidator } from './unique-email/unique-email.validator';
import { uniqueUsernameValidator } from './unique-username/unique-username.validator';

export class AppValidators {
  static email(control: AbstractControl): ValidationErrors | null {
    return emailValidator(control);
  }

  static uniqueEmail(usersHttpService: any): AsyncValidatorFn {
    return uniqueEmailValidator(usersHttpService);
  }

  static uniqueUsername(usersService: UsersHttpService): AsyncValidatorFn {
    return uniqueUsernameValidator(usersService);
  }
}
