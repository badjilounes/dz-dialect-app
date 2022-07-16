import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { AppTranslateModule } from 'src/app/core/translate/translate.module';
import { CapitalizeModule } from '../../technical/capitalize/capitalize.module';
import { TranslationBlocComponent } from './translation-bloc/translation-bloc.component';
import { TranslationContentComponent } from './translation-content/translation-content.component';
import { TranslationHeaderComponent } from './translation-header/translation-header.component';

@NgModule({
  declarations: [TranslationHeaderComponent, TranslationContentComponent, TranslationBlocComponent],
  imports: [
    CommonModule,
    AppTranslateModule.forChild(),
    CapitalizeModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    MatDividerModule,
    ClipboardModule,
  ],
  exports: [TranslationBlocComponent],
})
export class TranslationSentenceModule {}
