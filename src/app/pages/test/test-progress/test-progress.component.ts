import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { TestService } from '../test.service';

@Component({
  selector: 'app-test-progress',
  templateUrl: './test-progress.component.html',
  styleUrls: ['./test-progress.component.scss'],
})
export class TestProgressComponent implements OnInit {
  get value(): number {
    return ((this.testService.step + 1) * 100) / this.testService.nbSteps;
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly testService: TestService,
  ) {}

  ngOnInit(): void {}
}
