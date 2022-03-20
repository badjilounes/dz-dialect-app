import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppTranslateModule } from 'src/app/core/translate/translate.module';
import { CapitalizeModule } from 'src/app/shared/capitalize/capitalize.module';
import { GeneratedSentenceModule } from '../../shared/generated-sentence/generated-sentence.module';
import { RandomComponent } from './random.component';

@NgModule({
  declarations: [RandomComponent],
  imports: [
    CommonModule,
    GeneratedSentenceModule,
    AppTranslateModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    GeneratedSentenceModule,
    CapitalizeModule,
  ],
})
export class RandomModule {}
