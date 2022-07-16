import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AppRoute } from '../routing/app-route.interface';
import { RoutingService } from '../routing/routing.service';
import { ThemeService } from '../theme/theme.service';

@Component({
  selector: 'app-unauthenticated-layout',
  templateUrl: './unauthenticated-layout.component.html',
  styleUrls: ['./unauthenticated-layout.component.scss'],
})
export class UnauthenticatedLayoutComponent implements OnInit {
  routes: AppRoute[] = this.routing.getAllRoutes().filter((route) => route.data?.menu);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  get routeTitle() {
    const [, routeTitle] = this.title.getTitle().split(' - ');
    return routeTitle;
  }

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly routing: RoutingService,
    private readonly title: Title,
    private readonly themeService: ThemeService,
  ) {}

  ngOnInit(): void {
    this.themeService.themedStatusBar = false;
  }
}
