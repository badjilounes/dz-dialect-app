import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppTranslateModule } from 'src/app/core/translate/translate.module';
import { TrainingBottomSheetValidateComponent } from './components/training-bottom-sheet-validate/training-bottom-sheet-validate.component';
import { TrainingProgressComponent } from './components/training-progress/training-progress.component';
import { TrainingQuestionComponent } from './components/training-question/training-question.component';
import { TrainingResponseComponent } from './components/training-response/training-response.component';
import { TrainingHomeComponent } from './pages/training-home/training-home.component';
import { TrainingResultComponent } from './pages/training-result/training-result.component';
import { TrainingComponent } from './pages/training/training.component';

import { TrainingRoutingModule } from './training-routing.module';
import { TrainingService } from './training.service';

@NgModule({
  declarations: [
    TrainingComponent,
    TrainingProgressComponent,
    TrainingQuestionComponent,
    TrainingResponseComponent,
    TrainingHomeComponent,
    TrainingResultComponent,
    TrainingBottomSheetValidateComponent,
  ],
  imports: [
    CommonModule,
    TrainingRoutingModule,
    AppTranslateModule.forChild(),
    MatProgressBarModule,
    MatButtonModule,
    MatDividerModule,
    MatChipsModule,
    MatBottomSheetModule,
    MatProgressSpinnerModule,
  ],
  providers: [TrainingService],
})
export class TrainingModule {}
