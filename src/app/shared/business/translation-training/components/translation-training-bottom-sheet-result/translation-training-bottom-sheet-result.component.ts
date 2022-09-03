import { Component, Inject } from '@angular/core';
import {
  MatBottomSheetModule,
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { CapitalizeModule } from 'src/app/shared/technical/capitalize/capitalize.module';

@Component({
  selector: 'app-translation-training-bottom-sheet-result',
  templateUrl: './translation-training-bottom-sheet-result.component.html',
  styleUrls: ['./translation-training-bottom-sheet-result.component.scss'],
  standalone: true,
  imports: [CapitalizeModule, TranslateModule, MatButtonModule, MatBottomSheetModule],
})
export class TranslationTrainingBottomSheetResultComponent {
  constructor(
    private readonly bottomSheet: MatBottomSheetRef,
    @Inject(MAT_BOTTOM_SHEET_DATA) public result: { success: boolean; answer: string },
  ) {}

  nextStep(): void {
    this.bottomSheet.dismiss();
  }
}
