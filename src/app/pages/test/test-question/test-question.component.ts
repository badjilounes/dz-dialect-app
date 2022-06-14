import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { TestService } from '../test.service';

@Component({
  selector: 'app-test-question',
  templateUrl: './test-question.component.html',
  styleUrls: ['./test-question.component.scss'],
})
export class TestQuestionComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  get sentence(): string {
    return this.testService.sentences?.[this.testService.step]?.dz || '';
  }

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly testService: TestService,
  ) {}

  ngOnInit(): void {}
}
