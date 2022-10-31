import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LetModule } from '@ngrx/component';
import { PresentationStore } from 'src/app/pages/presentation/presentation.store';
import { ExamComponent } from '../../shared/business/exam/exam.component';

@Component({
  templateUrl: './presentation.page.html',
  styleUrls: ['./presentation.page.scss'],
  providers: [PresentationStore],
  standalone: true,
  imports: [CommonModule, LetModule, MatSnackBarModule, MatProgressSpinnerModule, ExamComponent],
})
export class PresentationPage implements OnInit {
  exam$ = this.presentationStore.exam$;
  loading$ = this.presentationStore.isLoading$;
  showResult$ = this.presentationStore.showResult$;
  showTraining$ = this.presentationStore.showTraining$;

  constructor(private readonly presentationStore: PresentationStore) { }

  ngOnInit(): void {
    this.presentationStore.getPresentation();
  }
}
