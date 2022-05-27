import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { TestService } from '../test.service';

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

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly testService: TestService,
  ) {}

  ngOnInit(): void {}

  nextStep() {
    this.testService.nextStep();
  }
}
