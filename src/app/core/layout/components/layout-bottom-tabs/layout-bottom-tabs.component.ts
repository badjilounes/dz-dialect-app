import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { LetModule } from '@ngrx/component';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, map, shareReplay } from 'rxjs';
import { LayoutLink } from 'src/app/core/layout/models/layout-item';
import { RoutingService } from 'src/app/core/routing/routing.service';
import { ThemeModeToggleComponent } from 'src/app/shared/technical/theme-mode-toggle/theme-mode-toggle.component';
import { AppStore } from '../../../../app.store';

@Component({
  selector: 'app-layout-bottom-tabs',
  templateUrl: './layout-bottom-tabs.component.html',
  styleUrls: ['./layout-bottom-tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    LetModule,
    MatToolbarModule,
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
    ThemeModeToggleComponent,
  ],
})
export class LayoutBottomTabsComponent {
  links: LayoutLink[] = [
    {
      type: 'link',
      link: '/learn',
      label: 'learn',
      icon: 'home',
    },

    {
      type: 'link',
      link: '/train',
      label: 'train',
      icon: 'quest',
    },

    {
      type: 'link',
      link: '/profile/me',
      label: 'settings',
      icon: 'sign-in-active',
    },
  ];

  userImage$: Observable<string | undefined> = this.appStore.user$.pipe(
    map((user) => user?.imageUrl || '/assets/images/unknown-user.png'),
    shareReplay(),
  );

  constructor(
    private readonly routingService: RoutingService,
    private readonly appStore: AppStore,
  ) {}
}
