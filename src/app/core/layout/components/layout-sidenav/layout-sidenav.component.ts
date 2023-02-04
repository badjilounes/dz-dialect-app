import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { LetModule } from '@ngrx/component';
import { TranslateModule } from '@ngx-translate/core';
import { AppStore } from 'src/app/app.store';

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
  @Input() links!: LayoutSidenavItem[];

  isDesktopLarge$ = this.appStore.isDesktopLarge$;

  constructor(private readonly appStore: AppStore) {}
}