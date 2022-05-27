import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { map, Observable, shareReplay } from 'rxjs';
import { StepResult, TestService } from '../test.service';

@Component({
  selector: 'app-test-bottom-sheet-result',
  templateUrl: './test-bottom-sheet-result.component.html',
  styleUrls: ['./test-bottom-sheet-result.component.scss'],
})
export class TestBottomSheetResultComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  get result(): StepResult | undefined {
    return this.testService.getResult();
  }

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly testService: TestService,
    private readonly bottomSheet: MatBottomSheetRef,
  ) {}

  ngOnInit(): void {}

  nextStep(): void {
    this.testService.nextStep();
    this.bottomSheet.dismiss();
  }
}
