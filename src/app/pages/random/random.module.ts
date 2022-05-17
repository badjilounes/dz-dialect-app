import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppTranslateModule } from 'src/app/core/translate/translate.module';
import { TranslationSentenceModule } from 'src/app/shared/business/translation-sentence/translation-sentence.module';
import { CapitalizeModule } from 'src/app/shared/technical/capitalize/capitalize.module';
import { StorageModule } from 'src/app/shared/technical/storage/storage.module';
import { GeneratedSentenceComponent } from './generated-sentence/generated-sentence.component';
import { RandomComponent } from './random.component';

@NgModule({
  declarations: [RandomComponent, GeneratedSentenceComponent],
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
  ],
})
export class RandomModule {}
