import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { TrainingService } from '../../training.service';

@Component({
  selector: 'app-training-response',
  templateUrl: './training-response.component.html',
  styleUrls: ['./training-response.component.scss'],
})
export class TrainingResponseComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  get response(): string[] {
    return this.trainingService.responses?.[this.trainingService.step]?.responses || [];
  }

  get propositions(): string[] {
    const allPropositions =
      this.trainingService.sentences?.[this.trainingService.step]?.word_propositions?.fr || [];
    return allPropositions.filter((proposition) => !this.response.includes(proposition));
  }

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly trainingService: TrainingService,
  ) {}

  ngOnInit(): void {}

  addToResponse(word: string) {
    this.trainingService.setStepResponses([...this.response, word]);
  }

  removeToResponse(word: string) {
    const responses = this.response.filter((response) => response !== word);

    this.trainingService.setStepResponses(responses);
  }
}
