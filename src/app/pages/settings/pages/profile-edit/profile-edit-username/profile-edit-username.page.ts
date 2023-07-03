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
import { ProfileEditUsernameStore } from './profile-edit-username.store';

@UntilDestroy()
@Component({
  templateUrl: './profile-edit-username.page.html',
  styleUrls: ['./profile-edit-username.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    LetModule,
    TranslateModule,
  ],
  providers: [provideComponentStore(ProfileEditUsernameStore)],
})
export class ProfileEditUsernamePage implements OnInit {
  form: FormGroup = new FormGroup({
    username: new FormControl(
      '',
      [Validators.required],
      [AppValidators.uniqueUsername(this.usersHttpService)],
    ),
  });

  statusChanges$ = this.form.statusChanges;

  constructor(
    private readonly store: ProfileEditUsernameStore,
    private readonly usersHttpService: UsersHttpService,
  ) {}

  ngOnInit(): void {
    this.store.username$
      .pipe(
        tap((username) => this.form.patchValue({ username })),
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

    this.store.saveChanges(this.form.value.username);
  }
}
