import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AppTranslateModule } from 'src/app/core/translate/translate.module';
import { TestBottomSheetComponent } from './test-bottom-sheet/test-bottom-sheet.component';
import { TestProgressComponent } from './test-progress/test-progress.component';
import { TestQuestionComponent } from './test-question/test-question.component';
import { TestResponseComponent } from './test-response/test-response.component';
import { TestComponent } from './test.component';

@NgModule({
  declarations: [
    TestComponent,
    TestProgressComponent,
    TestBottomSheetComponent,
    TestQuestionComponent,
    TestResponseComponent,
  ],
  imports: [
    CommonModule,
    AppTranslateModule,
    MatProgressBarModule,
    MatButtonModule,
    MatDividerModule,
    MatChipsModule,
  ],
})
export class TestModule {}
