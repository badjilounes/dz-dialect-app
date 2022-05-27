import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { map, Observable, of, shareReplay } from 'rxjs';
import { DefaultService, ResponseSentences } from 'src/api';
import { TestService } from './test.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  sentences$: Observable<ResponseSentences[]> = of([]);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  nbSteps = this.testService.nbSteps;

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly api: DefaultService,
    private readonly testService: TestService,
  ) {}

  ngOnInit(): void {
    this.api
      .generateSentenceGet(this.nbSteps)
      .subscribe((response) => (this.testService.sentences = response.sentences || []));
  }
}
