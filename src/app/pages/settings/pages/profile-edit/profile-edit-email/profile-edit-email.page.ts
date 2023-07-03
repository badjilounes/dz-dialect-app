import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { LetModule } from '@ngrx/component';
import { provideComponentStore } from '@ngrx/component-store';
import { TranslateModule } from '@ngx-translate/core';
import { tap } from 'rxjs';
import { AppValidators } from 'src/app/shared/technical/validators/app-validators';
import { UsersHttpService } from 'src/clients/dz-dialect-identity-api';
import { ProfileEditEmailStore } from './profile-edit-email.store';

@UntilDestroy()
@Component({
  templateUrl: './profile-edit-email.page.html',
  styleUrls: ['./profile-edit-email.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    LetModule,
    TranslateModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    CommonModule,
  ],
  providers: [provideComponentStore(ProfileEditEmailStore)],
})
export class ProfileEditEmailPage implements OnInit {
  form: FormGroup = new FormGroup({
    email: new FormControl(
      '',
      [Validators.required, AppValidators.email],
      [AppValidators.uniqueEmail(this.usersHttpService)],
    ),
  });

  statusChanges$ = this.form.statusChanges;

  constructor(
    private readonly usersHttpService: UsersHttpService,
    private readonly store: ProfileEditEmailStore,
  ) {}

  ngOnInit(): void {
    this.store.email$
      .pipe(
        tap((email) => this.form.patchValue({ email })),
        tap(() => this.form.markAsPristine()),
        untilDestroyed(this),
      )
      .subscribe();
  }

  cancel() {
    this.store.undoChanges();
  }

  save() {
    if (this.form.invalid || this.form.pristine || this.form.status === 'PENDING') {
      return;
    }

    this.store.saveChanges(this.form.value.email);
  }
}
