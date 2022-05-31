import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppTranslateModule } from 'src/app/core/translate/translate.module';
import { TestBottomSheetResultComponent } from './test-bottom-sheet-result/test-bottom-sheet-result.component';
import { TestBottomSheetValidateComponent } from './test-bottom-sheet-validate/test-bottom-sheet-validate.component';
import { TestHomeComponent } from './test-home/test-home.component';
import { TestProgressComponent } from './test-progress/test-progress.component';
import { TestQuestionComponent } from './test-question/test-question.component';
import { TestResponseComponent } from './test-response/test-response.component';
import { TestResultComponent } from './test-result/test-result.component';
import { TestRoutingModule } from './test-routing.module';
import { TestComponent } from './test.component';
import { TestService } from './test.service';

@NgModule({
  declarations: [
    TestComponent,
    TestProgressComponent,
    TestBottomSheetValidateComponent,
    TestQuestionComponent,
    TestResponseComponent,
    TestBottomSheetResultComponent,
    TestHomeComponent,
    TestResultComponent,
  ],
  imports: [
    CommonModule,
    TestRoutingModule,
    AppTranslateModule.forChild(),
    MatProgressBarModule,
    MatButtonModule,
    MatDividerModule,
    MatChipsModule,
    MatBottomSheetModule,
    MatProgressSpinnerModule,
  ],
  providers: [TestService],
})
export class TestModule {}
