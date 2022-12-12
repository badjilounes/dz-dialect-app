import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import {
  MatBottomSheetModule,
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { CapitalizeModule } from '../../../../technical/capitalize/capitalize.module';

@Component({
  selector: 'app-exam-result',
  templateUrl: './exam-result.component.html',
  styleUrls: ['./exam-result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CapitalizeModule, TranslateModule, MatButtonModule, MatBottomSheetModule],
})
export class ExamResultComponent {
  constructor(
    private readonly bottomSheet: MatBottomSheetRef,
    @Inject(MAT_BOTTOM_SHEET_DATA) public result: { valid: boolean; answer: string },
  ) {}

  nextStep(): void {
    this.bottomSheet.dismiss();
  }
}