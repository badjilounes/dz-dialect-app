import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, map, Observable, shareReplay, tap } from 'rxjs';
import { DefaultService } from 'src/api';
import { TestService } from '../test.service';

@Component({
  selector: 'app-test-result',
  templateUrl: './test-result.component.html',
  styleUrls: ['./test-result.component.scss'],
})
@UntilDestroy()
export class TestResultComponent {
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  get score(): number {
    return this.testService.score;
  }

  get total(): number {
    return this.testService.nbSteps;
  }

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly router: Router,
    private readonly api: DefaultService,
    private readonly testService: TestService,
  ) {}

  restartTraining(): void {
    this.loading$.next(true);
    this.api
      .generateSentenceGet(this.testService.nbSteps)
      .pipe(
        map((response) => response.sentences || []),
        tap((sentences) => this.testService.init(sentences)),
        tap(() => this.loading$.next(false)),
        tap(() => this.router.navigate(['/test/start'])),
        untilDestroyed(this),
      )
      .subscribe();
  }
}
