import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LetModule } from '@ngrx/component';
import { Observable, of } from 'rxjs';
import { AppStore } from 'src/app/app.store';
import { PageLayoutDirective } from '../../core/layout/directives/is-page-layout.directive';
import {
  GetExerciseResponseDto,
  StudentHttpService,
} from '../../../clients/dz-dialect-training-api';
import { TrainButtonComponent } from './components/train-button/train-button.component';

@Component({
  selector: 'app-train',
  templateUrl: './train.page.html',
  styleUrls: ['./train.page.scss'],
  standalone: true,
  imports: [CommonModule, LetModule, TrainButtonComponent],
  hostDirectives: [PageLayoutDirective],
})
export class TrainPage implements OnInit {
  exerciseList$: Observable<GetExerciseResponseDto[]> = of([]);

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly userAppStore: AppStore,
    private readonly studentHttpService: StudentHttpService,
  ) {}

  ngOnInit(): void {
    const accessToken = this.route.snapshot.queryParams['access_token'];
    if (accessToken) {
      this.router
        .navigate(['/train'], { replaceUrl: true })
        .then(() => this.userAppStore.setAsAuthenticated(accessToken));
    }

    this.exerciseList$ = this.studentHttpService.getExerciseList();
  }

  getLeftButtonPosition(index: number): number {
    let multiplicator = index % 4;

    if (multiplicator) {
      multiplicator--;
      multiplicator = (multiplicator % 2) + 1;
    }

    const isLeft = Math.floor(index / 4) % 2 === 0;

    return multiplicator * 36 * (isLeft ? -1 : 1);
  }
}
