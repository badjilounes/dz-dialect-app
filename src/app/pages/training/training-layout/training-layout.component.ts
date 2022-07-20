import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, map, Observable, shareReplay, tap } from 'rxjs';
import { BuyMeACoffeeService } from 'src/app/core/buy-me-a-coffee/buy-me-a-coffee.service';
import { ThemeService } from 'src/app/core/theme/theme.service';

@Component({
  selector: 'app-training-layout',
  templateUrl: './training-layout.component.html',
  styleUrls: ['./training-layout.component.scss'],
})
@UntilDestroy()
export class TrainingLayoutComponent implements OnInit, OnDestroy {
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
      link: '/sign-in',
      label: 'sign-in',
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
  ) {}

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
