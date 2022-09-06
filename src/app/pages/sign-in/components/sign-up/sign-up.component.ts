import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { LetModule } from '@ngrx/component';
import { TranslateModule } from '@ngx-translate/core';
import { AuthSignUpDto } from 'src/clients/dz-dialect-identity-api';

const matchPassword: ValidatorFn = (control: AbstractControl):  ValidationErrors | null => {
  const password = control.parent?.get('password')?.value;
  const matchPassword = password === control.value;
  return matchPassword ? null : { matchPassword: true }
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    LetModule,
    TranslateModule,
    MatDividerModule,
  ]
})
export class SignUpComponent {
  @Output() formSubmitted: EventEmitter<AuthSignUpDto> = new EventEmitter<AuthSignUpDto>();

  hide = {
    password: true,
    confirmPassword: true,
  }

  form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required, matchPassword]),
  });

  submit() {
    if (!this.form.valid) {
      return;
    }

    const credentials: AuthSignUpDto = {
      username: this.form.value.username,
      password: this.form.value.password,
    };

    this.formSubmitted.emit(credentials);
  }
}