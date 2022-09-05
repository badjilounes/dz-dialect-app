import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LetModule } from '@ngrx/component';
import { AppStore } from 'src/app/app.store';
import {
  SidenavComponent,
  SidenavItem,
} from 'src/app/shared/design-system/sidenav/sidenav.component';
import { TabsComponent } from 'src/app/shared/design-system/tabs/tabs.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [RouterModule, TabsComponent, CommonModule, LetModule, SidenavComponent],
})
export class SettingsPage {
  links: SidenavItem[] = [
    {
      label: 'Informations personnelles',
      link: 'profile',
      icon: 'badge_outline',
    },
    {
      label: 'Succès',
      link: 'success',
      icon: 'emoji_events_outline',
    },
  ];

  isMobile$ = this.appStore.isMobileOrTablet$;

  constructor(private appStore: AppStore) {}
}
