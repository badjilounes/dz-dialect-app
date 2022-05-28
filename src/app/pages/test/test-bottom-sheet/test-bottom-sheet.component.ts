import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { map, Observable, shareReplay } from 'rxjs';
import { TestBottomSheetResultComponent } from '../test-bottom-sheet-result/test-bottom-sheet-result.component';
import { StepResult, TestService } from '../test.service';

@Component({
  selector: 'app-test-bottom-sheet',
  templateUrl: './test-bottom-sheet.component.html',
  styleUrls: ['./test-bottom-sheet.component.scss'],
})
export class TestBottomSheetComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  stepResult: StepResult | undefined;

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly testService: TestService,
    private readonly bottomSheet: MatBottomSheet,
  ) {}

  ngOnInit(): void {}

  showResult() {
    this.stepResult = {
      success: this.testService.success,
      answer: this.testService.answer,
    };

    const bottomSheetRef = this.bottomSheet.open(TestBottomSheetResultComponent, {
      disableClose: true,
      panelClass: ['step-result', this.stepResult?.success ? 'success' : 'failure'],
    });

    bottomSheetRef.afterDismissed().subscribe(() => {
      this.testService.nextStep();
    });
  }
}
