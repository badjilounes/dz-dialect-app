import { Component, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { StepResult } from '../test.service';

@Component({
  selector: 'app-test-bottom-sheet-result',
  templateUrl: './test-bottom-sheet-result.component.html',
  styleUrls: ['./test-bottom-sheet-result.component.scss'],
})
export class TestBottomSheetResultComponent {
  constructor(
    private readonly bottomSheet: MatBottomSheetRef,
    @Inject(MAT_BOTTOM_SHEET_DATA) public result: StepResult,
  ) {}

  nextStep(): void {
    this.bottomSheet.dismiss();
  }
}
