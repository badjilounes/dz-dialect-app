import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LetModule } from '@ngrx/component';
import { AppTranslateModule } from 'src/app/core/translate/translate.module';
import { TranslationTrainingModule } from 'src/app/shared/business/translation-training/translation-training.module';
import { TrainingPresentationOverviewComponent } from './components/training-presentation-overview/training-presentation-overview.component';
import { TrainingPresentationResultComponent } from './components/training-presentation-result/training-presentation-result.component';
import { TrainingPresentationRoutingModule } from './training-presentation-routing.module';
import { TrainingPresentationPage } from './training-presentation.page';

@NgModule({
  declarations: [
    TrainingPresentationPage,
    TrainingPresentationResultComponent,
    TrainingPresentationOverviewComponent,
  ],
  imports: [
    CommonModule,
    TrainingPresentationRoutingModule,
    TranslationTrainingModule,
    AppTranslateModule.forChild(),
    MatButtonModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    LetModule,
  ],
})
export class TrainingPresentationModule {}
