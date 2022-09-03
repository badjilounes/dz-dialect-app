import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { LetModule } from '@ngrx/component';
import { filter, map, Observable, shareReplay, tap } from 'rxjs';
import { BuyMeACoffeeService } from 'src/app/core/buy-me-a-coffee/buy-me-a-coffee.service';
import { ThemeService } from 'src/app/core/theme/theme.service';
import { TrainingToolbarBottomComponent } from './components/training-toolbar-bottom/training-toolbar-bottom.component';
import { TrainingToolbarTopComponent } from './components/training-toolbar-top/training-toolbar-top.component';

@Component({
  selector: 'app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    TrainingToolbarBottomComponent,
    TrainingToolbarTopComponent,
    LetModule,
    RouterModule,
    CommonModule,
  ],
})
@UntilDestroy()
export class AppLayoutComponent implements OnInit, OnDestroy {
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
    {
      activeImage: 'sign-in-active',
      image: 'sign-in',
      link: '/profile',
      label: 'profile',
    },
  ];

  isMobile$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.XSmall]).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly buyMeACoffeeService: BuyMeACoffeeService,
    private readonly themeService: ThemeService,
    private readonly matIconRegistry: MatIconRegistry,
    private readonly domSanitizer: DomSanitizer,
  ) {
    this.matIconRegistry.addSvgIcon(
      'train',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/svg/train.svg'),
    );
    this.matIconRegistry.addSvgIcon(
      'train-active',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/svg/train-active.svg'),
    );
    this.matIconRegistry.addSvgIcon(
      'learn',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/svg/learn.svg'),
    );
    this.matIconRegistry.addSvgIcon(
      'learn-active',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/svg/learn-active.svg'),
    );

    this.matIconRegistry.addSvgIcon(
      'sign-in',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/svg/sign-in.svg'),
    );
    this.matIconRegistry.addSvgIcon(
      'sign-in-active',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/svg/sign-in-active.svg'),
    );
  }

  ngOnInit(): void {
    this.isMobile$
      .pipe(
        filter((isMobile) => isMobile),
        tap(() => this.buyMeACoffeeService.updatePosition({ bottom: 108 })),
        untilDestroyed(this),
      )
      .subscribe();

    this.themeService.themedStatusBar = true;
  }

  ngOnDestroy(): void {
    this.isMobile$
      .pipe(
        filter((isMobile) => isMobile),
        tap(() => this.buyMeACoffeeService.resetPosition()),
        untilDestroyed(this),
      )
      .subscribe();
  }
}
