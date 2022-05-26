import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './test.component';
import { TestProgressComponent } from './test-progress/test-progress.component';
import { TestBottomSheetComponent } from './test-bottom-sheet/test-bottom-sheet.component';
import { TestQuestionComponent } from './test-question/test-question.component';
import { TestResponseComponent } from './test-response/test-response.component';



@NgModule({
  declarations: [
    TestComponent,
    TestProgressComponent,
    TestBottomSheetComponent,
    TestQuestionComponent,
    TestResponseComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TestModule { }
