import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { LetModule } from '@ngrx/component';
import { AppTranslateModule } from 'src/app/core/translate/translate.module';
import { TranslationTrainingModule } from 'src/app/shared/business/translation-training/translation-training.module';
import { ConfirmDialogModule } from 'src/app/shared/technical/confirm-dialog/confirm-dialog.module';
import { TrainingPresentationOverviewComponent } from './components/training-presentation-overview/training-presentation-overview.component';
import { TrainingPresentationResultComponent } from './components/training-presentation-result/training-presentation-result.component';
import { TrainingPresentationPage } from './training-presentation.page';

@NgModule({
  declarations: [
    TrainingPresentationPage,
    TrainingPresentationResultComponent,
    TrainingPresentationOverviewComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    TranslationTrainingModule,
    AppTranslateModule.forChild(),
    MatButtonModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    LetModule,
    RouterModule,
    ConfirmDialogModule,
  ],
})
export class TrainingPresentationModule {}
