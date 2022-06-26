import { Component, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { CapitalizeModule } from 'src/app/shared/technical/capitalize/capitalize.module';
import { StepResult } from '../../test.service';

@Component({
  selector: 'app-test-bottom-sheet-result',
  templateUrl: './test-bottom-sheet-result.component.html',
  styleUrls: ['./test-bottom-sheet-result.component.scss'],
  standalone: true,
  imports: [CapitalizeModule, TranslateModule, MatButtonModule],
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
