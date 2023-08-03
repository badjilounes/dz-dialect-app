import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { LetModule } from '@ngrx/component';
import { Observable, filter, tap } from 'rxjs';
import { AppStore } from 'src/app/app.store';
import { BuyMeACoffeeService } from 'src/app/core/buy-me-a-coffee/buy-me-a-coffee.service';
import { LayoutSidenavComponent } from 'src/app/core/layout/components/layout-sidenav/layout-sidenav.component';
import { ThemeService } from 'src/app/core/theme/theme.service';
import { LayoutBottomTabsComponent } from './components/layout-bottom-tabs/layout-bottom-tabs.component';
import { SvgIconModule } from '../../shared/technical/svg-icon/svg-icon.module';
import { SvgIconService } from '../../shared/technical/svg-icon/svg-icon.service';

@Component({
  selector: 'app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    LetModule,
    RouterModule,
    CommonModule,
    LayoutSidenavComponent,
    LayoutBottomTabsComponent,
    SvgIconModule,
  ],
})
@UntilDestroy()
export class AppLayoutComponent implements OnInit, OnDestroy {
  isSmallScreen$: Observable<boolean> = this.appStore.isSmallScreen$;

  constructor(
    private readonly appStore: AppStore,
    private readonly buyMeACoffeeService: BuyMeACoffeeService,
    private readonly themeService: ThemeService,

    private readonly svgIconService: SvgIconService,
  ) {
    this.svgIconService.registerIcons([
      'train',
      'train-active',
      'learn',
      'learn-active',
      'sign-in',
      'sign-in-active',
      'home',
      'quest',
      'cog',
      'more',
    ]);
  }

  ngOnInit(): void {
    this.isSmallScreen$
      .pipe(
        filter((isMobile) => isMobile),
        tap(() => this.buyMeACoffeeService.updatePosition({ bottom: 108 })),
        untilDestroyed(this),
      )
      .subscribe();

    this.themeService.themedStatusBar = true;
  }

  ngOnDestroy(): void {
    this.isSmallScreen$
      .pipe(
        filter((isMobile) => isMobile),
        tap(() => this.buyMeACoffeeService.resetPosition()),
        untilDestroyed(this),
      )
      .subscribe();
  }
}
