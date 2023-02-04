import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { LetModule } from '@ngrx/component';
import { TranslateModule } from '@ngx-translate/core';
import { map, Observable, shareReplay } from 'rxjs';
import { AppStore } from 'src/app/app.store';
import { RoutingService } from 'src/app/core/routing/routing.service';
import { BehaviorModule } from 'src/app/shared/technical/behavior/behavior.module';
import { filterUndefined } from 'src/app/shared/technical/operators/filter-undefined.operator';
import { ThemeModeToggleComponent } from 'src/app/shared/technical/theme-mode-toggle/theme-mode-toggle.component';

@Component({
  selector: 'app-training-toolbar-top',
  templateUrl: './training-toolbar-top.component.html',
  styleUrls: ['./training-toolbar-top.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    ThemeModeToggleComponent,
    MatToolbarModule,
    RouterModule,
    CommonModule,
    TranslateModule,
    LetModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    BehaviorModule,
    MatDividerModule,
  ],
})
export class TrainingToolbarTopComponent {
  isMobile$: Observable<boolean> = this.appStore.isHandset$;

  userImage$: Observable<string | undefined> = this.appStore.user$.pipe(
    map((user) => user?.imageUrl || '/assets/images/unknown-user.png'),
    shareReplay(),
  );

  links = [
    {
      activeImage: 'train-active',
      image: 'train',
      link: '/train',
      label: 'train',
    },
    {
      activeImage: 'learn-active',
      image: 'learn',
      link: '/learn',
      label: 'learn',
    },
  ];

  isAuthenticated$ = this.appStore.isAuthenticated$;

  title$ = this.routingService.currentRoute$.pipe(
    filterUndefined(),
    map((route) => route.data['title']),
  );

  constructor(
    private readonly appStore: AppStore,
    private readonly router: Router,
    private readonly routingService: RoutingService,
  ) {}

  signOut(): void {
    this.appStore.setAsUnAuthenticated();
    this.router.navigate(['/train']);
  }
}
