import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LetModule } from '@ngrx/component';
import { GetTrainingResponseDto } from 'src/clients/dz-dialect-training-api';
import { ExamComponent } from '../../../../shared/business/exam/exam.component';
import { OverviewStore } from '../../store/overview.store';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss'],
  standalone: true,
  imports: [CommonModule, LetModule, MatSnackBarModule, MatProgressSpinnerModule, ExamComponent],
})
export class PresentationComponent {
  @Input() presentation!: GetTrainingResponseDto;

  constructor(private readonly overviewStore: OverviewStore) {}

  onExamComplete(): void {
    this.overviewStore.getResults();
  }
}
