import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { LetModule } from '@ngrx/component';
import { TranslateModule } from '@ngx-translate/core';
import { AppStore } from '../../../../app.store';
import { LayoutLink } from '../../models/layout-link';

export type LayoutSidenavItem = {
  label: string;
  link: string;
  icon: string;
};

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
  ],
})
export class LayoutSidenavComponent {
  links: LayoutLink[] = [
    {
      link: '/learn',
      label: 'learn',
      image: 'home',
    },

    {
      link: '/train',
      label: 'train',
      image: 'quest',
    },

    {
      link: '/settings/profile',
      label: 'profil',
      image: 'sign-in-active',
    },
  ];

  isDesktopLarge$ = this.appStore.isLargeScreen$;

  constructor(private readonly appStore: AppStore) {}
}
