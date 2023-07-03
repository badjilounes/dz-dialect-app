import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { provideComponentStore } from '@ngrx/component-store';
import { TranslateModule } from '@ngx-translate/core';
import { tap } from 'rxjs';
import { ProfileEditNameStore } from './profile-edit-name.store';

@UntilDestroy()
@Component({
  templateUrl: './profile-edit-name.page.html',
  styleUrls: ['./profile-edit-name.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    TranslateModule,
    MatSnackBarModule,
  ],
  providers: [provideComponentStore(ProfileEditNameStore)],
})
export class ProfileEditNamePage implements OnInit {
  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  constructor(private readonly store: ProfileEditNameStore) {}

  ngOnInit(): void {
    this.store.name$
      .pipe(
        tap((name) => this.form.patchValue({ name })),
        tap(() => this.form.markAsPristine()),
        untilDestroyed(this),
      )
      .subscribe();
  }

  cancel() {
    this.store.undoChanges();
  }

  save() {
    if (this.form.invalid || this.form.pristine) {
      return;
    }

    this.store.saveChanges(this.form.value.name);
  }
}
