import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveComponentModule } from '@ngrx/component';
import { AppTranslateModule } from 'src/app/core/translate/translate.module';
import { TranslationSentenceModule } from 'src/app/shared/business/translation-bloc/translation-bloc.module';
import { CapitalizeModule } from 'src/app/shared/technical/capitalize/capitalize.module';
import { StorageModule } from 'src/app/shared/technical/storage/storage.module';
import { RandomComponent } from './random.component';

@NgModule({
  declarations: [RandomComponent],
  imports: [
    CommonModule,
    StorageModule,
    AppTranslateModule,
    TranslationSentenceModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatSnackBarModule,
    CapitalizeModule,
    MatProgressSpinnerModule,
    ReactiveComponentModule,
  ],
})
export class RandomModule {}
