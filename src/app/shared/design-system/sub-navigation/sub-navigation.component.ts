import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LetModule } from '@ngrx/component';
import { AppStore } from 'src/app/app.store';
import { SidenavComponent, SidenavItem } from '../sidenav/sidenav.component';
import { TabItem, TabsComponent } from '../tabs/tabs.component';

export type SubNavigationItem = TabItem & SidenavItem;

@Component({
  selector: 'app-sub-navigation',
  templateUrl: './sub-navigation.component.html',
  styleUrls: ['./sub-navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [TabsComponent, SidenavComponent, LetModule, CommonModule, RouterModule],
})
export class SubNavigationComponent {
  @Input() links: SubNavigationItem[] = [];

  isMobile$ = this.appStore.isMobileOrTablet$;

  constructor(private readonly appStore: AppStore) {}
}
