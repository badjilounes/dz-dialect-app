import { Component } from '@angular/core';
import { SubNavigationComponent, SubNavigationItem } from 'src/app/shared/design-system/sub-navigation/sub-navigation.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [SubNavigationComponent],
})
export class SettingsPage {
  links: SubNavigationItem[] = [
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
}
