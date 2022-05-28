import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { TestService } from '../test.service';

@Component({
  selector: 'app-test-response',
  templateUrl: './test-response.component.html',
  styleUrls: ['./test-response.component.scss'],
})
export class TestResponseComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  get response(): string[] {
    return this.testService.responses?.[this.testService.step]?.responses || [];
  }

  get propositions(): string[] {
    const allPropositions =
      this.testService.sentences?.[this.testService.step]?.word_propositions_fr || [];
    return allPropositions.filter((proposition) => !this.response.includes(proposition));
  }

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly testService: TestService,
  ) {}

  ngOnInit(): void {}

  addToResponse(word: string) {
    const response = this.response;
    response.push(word);

    this.testService.responses[this.testService.step] = {
      step: this.testService.step,
      responses: response,
    };
  }

  removeToResponse(word: string) {
    const response = this.response;
    response.splice(response.indexOf(word), 1);

    this.testService.responses[this.testService.step] = {
      step: this.testService.step,
      responses: response,
    };
  }
}
