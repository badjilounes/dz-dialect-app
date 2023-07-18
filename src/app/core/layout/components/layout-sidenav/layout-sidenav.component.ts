import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { LetModule } from '@ngrx/component';
import { TranslateModule } from '@ngx-translate/core';
import { AppStore } from '../../../../app.store';
import { LayoutItem } from '../../models/layout-item';
import { MatLegacyMenuModule } from '@angular/material/legacy-menu';
import { OpenMenuOnMouseoverDirective } from '../../../../shared/technical/open-on-mouseover/open-menu-on-mouseover.directive';

@Component({
  selector: 'app-layout-sidenav',
  templateUrl: './layout-sidenav.component.html',
  styleUrls: ['./layout-sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    LetModule,
    MatLegacyMenuModule,
    OpenMenuOnMouseoverDirective,
  ],
})
export class LayoutSidenavComponent {
  items: LayoutItem[] = [
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
      label: 'profil',
      icon: 'sign-in-active',
    },

    {
      type: 'heading',
      label: 'more',
      icon: 'more',
      links: [
        { type: 'link', label: 'settings', link: '/settings/account' },
        { type: 'link', label: 'logout', link: '/logout', class: 'logout-link' },
      ],
    },
  ];

  isDesktopLarge$ = this.appStore.isLargeScreen$;

  constructor(private readonly appStore: AppStore) {}
}
