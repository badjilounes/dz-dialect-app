import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { StepResult, TestService } from '../test.service';

@Component({
  selector: 'app-test-bottom-sheet-result',
  templateUrl: './test-bottom-sheet-result.component.html',
  styleUrls: ['./test-bottom-sheet-result.component.scss'],
})
export class TestBottomSheetResultComponent {
  get result(): StepResult {
    return {
      success: this.testService.success,
      answer: this.testService.answer,
    };
  }

  constructor(
    private readonly testService: TestService,
    private readonly bottomSheet: MatBottomSheetRef,
  ) {}

  nextStep(): void {
    this.bottomSheet.dismiss();
  }
}
