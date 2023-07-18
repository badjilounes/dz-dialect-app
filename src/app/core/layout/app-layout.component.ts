import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { LetModule } from '@ngrx/component';
import { Observable, filter, tap } from 'rxjs';
import { AppStore } from 'src/app/app.store';
import { BuyMeACoffeeService } from 'src/app/core/buy-me-a-coffee/buy-me-a-coffee.service';
import { LayoutSidenavComponent } from 'src/app/core/layout/components/layout-sidenav/layout-sidenav.component';
import { ThemeService } from 'src/app/core/theme/theme.service';
import { LayoutBottomTabsComponent } from './components/layout-bottom-tabs/layout-bottom-tabs.component';

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
  ],
})
@UntilDestroy()
export class AppLayoutComponent implements OnInit, OnDestroy {
  isSmallScreen$: Observable<boolean> = this.appStore.isSmallScreen$;

  constructor(
    private readonly appStore: AppStore,
    private readonly buyMeACoffeeService: BuyMeACoffeeService,
    private readonly themeService: ThemeService,
    private readonly matIconRegistry: MatIconRegistry,
    private readonly domSanitizer: DomSanitizer,
  ) {
    const images = [
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
    ];

    images.forEach((image) => {
      this.matIconRegistry.addSvgIcon(
        image,
        this.domSanitizer.bypassSecurityTrustResourceUrl(`assets/svg/${image}.svg`),
      );
    });
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
