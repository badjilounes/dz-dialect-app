import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { map, Observable, shareReplay } from 'rxjs';
import { ExamStore } from '../../store/exam.store';

@Component({
  selector: 'app-exam-response',
  templateUrl: './exam-response.component.html',
  styleUrls: ['./exam-response.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, MatChipsModule],
})
export class ExamResponseComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  response$: Observable<string[]> = this.examStore.response$;
  propositions$: Observable<string[]> = this.examStore.propositions$;

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly examStore: ExamStore,
  ) {}

  addToResponse(word: string) {
    this.examStore.addToResponse(word);
  }

  removeToResponse(word: string) {
    this.examStore.removeFromResponse(word);
  }
}
