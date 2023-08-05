import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LetModule } from '@ngrx/component';
import { fromEvent, Observable, of } from 'rxjs';
import { AppStore } from 'src/app/app.store';
import { PageLayoutDirective } from '../../core/layout/directives/is-page-layout.directive';
import {
  GetExerciseResponseDto,
  StudentHttpService,
} from '../../../clients/dz-dialect-training-api';
import { TrainButtonComponent } from './components/train-button/train-button.component';
import { CdkScrollable, ScrollingModule } from '@angular/cdk/scrolling';
import { TrainToolbarComponent } from './components/train-toolbar/train-toolbar.component';
import { map } from 'rxjs/operators';
import { TrainCourseSectionComponent } from './components/train-course-section/train-course-section.component';

@Component({
  selector: 'app-train',
  templateUrl: './train.page.html',
  styleUrls: ['./train.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    LetModule,
    TrainButtonComponent,
    ScrollingModule,
    TrainToolbarComponent,
    TrainCourseSectionComponent,
  ],
  hostDirectives: [PageLayoutDirective, CdkScrollable],
})
export class TrainPage implements OnInit {
  isSmallScreen$ = this._appStore.isSmallScreen$;
  exerciseList$: Observable<GetExerciseResponseDto[]> = of([]);
  picture$ = this._appStore.user$.pipe(map((user) => user?.imageUrl));

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _router: Router,
    private readonly _userAppStore: AppStore,
    private readonly _studentHttpService: StudentHttpService,
    private readonly _appStore: AppStore,
  ) {}

  ngOnInit(): void {
    const accessToken = this._route.snapshot.queryParams['access_token'];
    if (accessToken) {
      this._router
        .navigate(['/train'], { replaceUrl: true })
        .then(() => this._userAppStore.setAsAuthenticated(accessToken));
    }

    this.exerciseList$ = this._studentHttpService.getExerciseList();

    this.showScrollTopButton$ = fromEvent(window, 'scroll').pipe(
      map(() => (document.documentElement.scrollTop || document.body.scrollTop) > 100),
    );
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
