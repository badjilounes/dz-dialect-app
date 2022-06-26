import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map, Observable, shareReplay } from 'rxjs';
import { TrainingStore } from '../../store/training.store';
import { TrainingBottomSheetResultComponent } from '../training-bottom-sheet-result/training-bottom-sheet-result.component';

@Component({
  selector: 'app-training-bottom-sheet-validate',
  templateUrl: './training-bottom-sheet-validate.component.html',
  styleUrls: ['./training-bottom-sheet-validate.component.scss'],
})
@UntilDestroy()
export class TrainingBottomSheetValidateComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  success$: Observable<boolean> = this.trainingStore.success$;
  answer$: Observable<string> = this.trainingStore.currentAnswer$;

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly trainingStore: TrainingStore,
    private readonly bottomSheet: MatBottomSheet,
  ) {}

  ngOnInit(): void {}

  showResult(success: boolean, answer: string) {
    const bottomSheetRef = this.bottomSheet.open(TrainingBottomSheetResultComponent, {
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
