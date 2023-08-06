import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { fromEvent, Observable } from 'rxjs';
import { AppStore } from 'src/app/app.store';
import { PageLayoutDirective } from '../../core/layout/directives/is-page-layout.directive';

import { TrainButtonComponent } from './components/train-button/train-button.component';
import { TrainToolbarComponent } from './components/train-toolbar/train-toolbar.component';
import { map } from 'rxjs/operators';
import { TrainCourseSectionComponent } from './components/train-course-section/train-course-section.component';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { TrainPageStore } from './train-page.store';
import { LetModule } from '@ngrx/component';

@Component({
  selector: 'app-train',
  templateUrl: './train.page.html',
  styleUrls: ['./train.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    LetModule,
    MatIconModule,
    MatButtonModule,
    TrainButtonComponent,
    TrainToolbarComponent,
    TrainCourseSectionComponent,
  ],
  providers: [TrainPageStore],
  hostDirectives: [PageLayoutDirective],
})
export class TrainPage implements OnInit {
  exerciseList$ = this._store.exerciseList$;
  isSmallScreen$ = this._appStore.isSmallScreen$;
  picture$ = this._appStore.user$.pipe(map((user) => user?.imageUrl));
  showScrollTopButton$!: Observable<boolean>;
  toolbarColor$ = this._store.toolbarColor$;

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _router: Router,
    private readonly _userAppStore: AppStore,
    private readonly _appStore: AppStore,
    private readonly _store: TrainPageStore,
  ) {}

  ngOnInit(): void {
    const accessToken = this._route.snapshot.queryParams['access_token'];
    if (accessToken) {
      this._router
        .navigate(['/train'], { replaceUrl: true })
        .then(() => this._userAppStore.setAsAuthenticated(accessToken));
    }

    this.showScrollTopButton$ = fromEvent(window, 'scroll').pipe(
      map(() => (document.documentElement.scrollTop || document.body.scrollTop) > 100),
    );

    this._store.getExerciseList();
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
