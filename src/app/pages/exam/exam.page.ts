import { Component } from '@angular/core';
import { ExamComponent } from '../../shared/business/exam/exam.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  templateUrl: './exam.page.html',
  styleUrls: ['./exam.page.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, ExamComponent],
})
export class ExamPage {
  constructor(private readonly _route: ActivatedRoute, private readonly _router: Router) {}

  get examId(): string {
    return this._route.snapshot.params['examId'];
  }

  onExamComplete(): void {
    this._router.navigate(['/train']);
  }
}
