import { Component, OnInit } from '@angular/core';
import { ExamComponent } from '../../shared/business/exam/exam.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ThemeService } from '../../core/theme/theme.service';

@Component({
  templateUrl: './exam.page.html',
  styleUrls: ['./exam.page.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, ExamComponent],
})
export class ExamPage implements OnInit {
  get examId(): string {
    return this._route.snapshot.params['examId'];
  }

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _router: Router,
    private readonly _theme: ThemeService,
  ) {}

  ngOnInit(): void {
    this._theme.applyThemeToStatusBar();
  }

  onExamComplete(): void {
    this._router.navigate(['/train']);
  }
}
