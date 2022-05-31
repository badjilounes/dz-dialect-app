import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map, Observable, shareReplay } from 'rxjs';
import { TestBottomSheetResultComponent } from '../test-bottom-sheet-result/test-bottom-sheet-result.component';
import { StepResult, TestService } from '../test.service';

@Component({
  selector: 'app-test-bottom-sheet-validate',
  templateUrl: './test-bottom-sheet-validate.component.html',
  styleUrls: ['./test-bottom-sheet-validate.component.scss'],
})
@UntilDestroy()
export class TestBottomSheetValidateComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  stepResult: StepResult | undefined;

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly testService: TestService,
    private readonly bottomSheet: MatBottomSheet,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {}

  showResult() {
    this.stepResult = {
      success: this.testService.success,
      answer: this.testService.answer,
    };

    const bottomSheetRef = this.bottomSheet.open(TestBottomSheetResultComponent, {
      data: { success: this.testService.success, answer: this.testService.answer },
      disableClose: true,
      panelClass: ['step-result', this.stepResult?.success ? 'success' : 'failure'],
    });

    bottomSheetRef
      .afterDismissed()
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        if (this.testService.isLastStep) {
          this.router.navigate(['/test/result']);
          return;
        }

        this.testService.nextStep();
      });
  }
}
