import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LetModule } from '@ngrx/component';
import { AppTranslateModule } from 'src/app/core/translate/translate.module';
import { TranslationTrainingBottomSheetValidateComponent } from './components/translation-training-bottom-sheet-validate/translation-training-bottom-sheet-validate.component';
import { TranslationTrainingProgressComponent } from './components/translation-training-progress/translation-training-progress.component';
import { TranslationTrainingQuestionComponent } from './components/translation-training-question/translation-training-question.component';
import { TranslationTrainingResponseComponent } from './components/translation-training-response/translation-training-response.component';
import { TranslationTrainingComponent } from './components/translation-training/translation-training.component';

@NgModule({
  declarations: [
    TranslationTrainingBottomSheetValidateComponent,
    TranslationTrainingProgressComponent,
    TranslationTrainingQuestionComponent,
    TranslationTrainingResponseComponent,
    TranslationTrainingComponent,
    TranslationTrainingComponent,
  ],
  imports: [
    CommonModule,
    AppTranslateModule.forChild(),
    MatProgressBarModule,
    MatButtonModule,
    MatDividerModule,
    MatChipsModule,
    MatBottomSheetModule,
    MatProgressSpinnerModule,
    LetModule,
  ],
  exports: [TranslationTrainingComponent],
})
export class TranslationTrainingModule {}
