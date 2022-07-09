import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map, Observable, shareReplay } from 'rxjs';
import { TranslationTrainingStore } from '../../store/translation-training.store';
import { TranslationTrainingBottomSheetResultComponent } from '../translation-training-bottom-sheet-result/translation-training-bottom-sheet-result.component';

@Component({
  selector: 'app-translation-training-bottom-sheet-validate',
  templateUrl: './translation-training-bottom-sheet-validate.component.html',
  styleUrls: ['./translation-training-bottom-sheet-validate.component.scss'],
})
@UntilDestroy()
export class TranslationTrainingBottomSheetValidateComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  answer$: Observable<string> = this.trainingStore.step$.pipe(map((step) => step.answer));
  success$: Observable<boolean> = this.trainingStore.isResponseCorrect$;

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly trainingStore: TranslationTrainingStore,
    private readonly bottomSheet: MatBottomSheet,
  ) {}

  ngOnInit(): void {}

  showResult(success: boolean, answer: string) {
    const bottomSheetRef = this.bottomSheet.open(TranslationTrainingBottomSheetResultComponent, {
      data: { success, answer },
      disableClose: true,
      panelClass: ['step-result', success ? 'success' : 'failure'],
    });

    bottomSheetRef
      .afterDismissed()
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.trainingStore.nextStep();
      });
  }
}
