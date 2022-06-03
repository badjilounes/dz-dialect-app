import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AppRoute } from '../../core/routing/app-route.interface';
import { RoutingService } from '../../core/routing/routing.service';
import { ThemeService } from '../theme/theme.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
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
    private readonly theme: ThemeService,
  ) {}

  toggleThemeMode(): void {
    this.theme.toggleThemeMode();
  }
}
