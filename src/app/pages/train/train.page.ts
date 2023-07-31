import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { ActivatedRoute, Router } from '@angular/router';
import { LetModule } from '@ngrx/component';
import { Observable, of } from 'rxjs';
import { AppStore } from 'src/app/app.store';
import { PageLayoutDirective } from '../../core/layout/directives/is-page-layout.directive';
import {
  GetExerciseResponseDto,
  StudentHttpService,
} from '../../../clients/dz-dialect-training-api';
import { AddClassOnPressDirective } from '../../shared/technical/behavior/add-class-on-click.directive';
import { MatLegacyProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatLegacyMenuModule } from '@angular/material/legacy-menu';
import { PreventClickDirective } from '../../shared/technical/behavior/prevent-click.directive';
import { StopClickPropagationDirective } from '../../shared/technical/behavior/stop-click-propagation.directive';

@Component({
  selector: 'app-train',
  templateUrl: './train.page.html',
  styleUrls: ['./train.page.scss'],
  standalone: true,
  imports: [
    MatButtonModule,
    CommonModule,
    MatIconModule,
    LetModule,
    AddClassOnPressDirective,
    MatLegacyProgressSpinnerModule,
    MatLegacyMenuModule,
    PreventClickDirective,
    StopClickPropagationDirective,
  ],
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

    return multiplicator * 44 * (isLeft ? -1 : 1);
  }
}
