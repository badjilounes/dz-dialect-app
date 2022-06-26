import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map, Observable, shareReplay } from 'rxjs';
import { StepResult, TrainingService } from '../../training.service';
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

  stepResult: StepResult | undefined;

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly trainingService: TrainingService,
    private readonly bottomSheet: MatBottomSheet,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {}

  showResult() {
    this.stepResult = {
      success: this.trainingService.success,
      answer: this.trainingService.answer,
    };

    const bottomSheetRef = this.bottomSheet.open(TrainingBottomSheetResultComponent, {
      data: { success: this.trainingService.success, answer: this.trainingService.answer },
      disableClose: true,
      panelClass: ['step-result', this.stepResult?.success ? 'success' : 'failure'],
    });

    bottomSheetRef
      .afterDismissed()
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        if (this.trainingService.isLastStep) {
          this.router.navigate(['/test/result']);
          return;
        }

        this.trainingService.nextStep();
      });
  }
}
