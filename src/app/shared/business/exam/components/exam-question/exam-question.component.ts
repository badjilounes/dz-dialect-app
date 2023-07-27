import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatLegacyChipsModule as MatChipsModule } from '@angular/material/legacy-chips';
import { TranslateModule } from '@ngx-translate/core';
import { map, Observable, shareReplay } from 'rxjs';
import { filterUndefined } from '../../../../technical/operators/filter-undefined.operator';
import { ExamStore } from '../../store/exam.store';

@Component({
  selector: 'app-exam-question',
  templateUrl: './exam-question.component.html',
  styleUrls: ['./exam-question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, TranslateModule, MatChipsModule],
})
export class ExamQuestionComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  question$: Observable<string> = this.examStore.question$.pipe(
    filterUndefined(),
    map((question) => question.question),
  );

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly examStore: ExamStore,
  ) {}
}
