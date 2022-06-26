import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppTranslateModule } from 'src/app/core/translate/translate.module';
import { TestBottomSheetValidateComponent } from './components/test-bottom-sheet-validate/test-bottom-sheet-validate.component';
import { TestProgressComponent } from './components/test-progress/test-progress.component';
import { TestQuestionComponent } from './components/test-question/test-question.component';
import { TestResponseComponent } from './components/test-response/test-response.component';
import { TestHomeComponent } from './pages/test-home/test-home.component';
import { TestResultComponent } from './pages/test-result/test-result.component';
import { TestComponent } from './pages/test/test.component';

import { TestRoutingModule } from './test-routing.module';
import { TestService } from './test.service';

@NgModule({
  declarations: [
    TestComponent,
    TestProgressComponent,
    TestBottomSheetValidateComponent,
    TestQuestionComponent,
    TestResponseComponent,
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
