import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Event,
  NavigationEnd,
  Params,
  Router,
} from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, filter, forkJoin, Observable, tap } from 'rxjs';
import { AppRouteData } from './app-route-data.interface';
import { AppRoute } from './app-route.interface';

@Injectable({
  providedIn: 'root',
})
@UntilDestroy()
export class RoutingService {
  routes$: BehaviorSubject<AppRoute[]> = new BehaviorSubject<AppRoute[]>([]);

  paramsSnapshot: Record<string, any> = {};
  params = new BehaviorSubject(this.paramsSnapshot);

  queryParams: Observable<Params> = this.route.queryParams;
  queryParamsSnapshot: Params = this.route.snapshot.queryParams;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly title: Title,
    private readonly translate: TranslateService,
  ) {}

  init() {
    this.router.events
      .pipe(
        filter((event: Event) => event instanceof NavigationEnd),
        tap(() => this.updateTitle()),
        tap(() => this.updateParams()),
        tap(() => this.updateQueryParams()),
        untilDestroyed(this),
      )
      .subscribe();
  }

  getRouteScope(route: ActivatedRouteSnapshot | AppRoute): string {
    return route.data?.scope;
  }

  getAllRoutes(): AppRoute[] {
    return (this.router.config as AppRoute[])
      .map((route: AppRoute) => this.getRouteWithChildren(route))
      .reduce((all: AppRoute[], current: AppRoute[]) => all.concat(current, []));
  }

  private getRouteWithChildren(route: AppRoute): AppRoute[] {
    let all: AppRoute[] = [];

    if (route.children) {
      route.children.forEach(
        (childRoute) => (all = all.concat(this.getRouteWithChildren(childRoute))),
      );
    } else {
      all.push(route);
    }

    return all;
  }

  private updateTitle() {
    let currentRoute = this.route;

    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
    }

    if (currentRoute.outlet === 'primary') {
      this.setTitle(currentRoute.snapshot.data);
    }
  }

  private updateParams() {
    const snapshot = this.route.snapshot.root;
    this.paramsSnapshot = this.collectParams(snapshot);
    this.params.next(this.paramsSnapshot);
  }

  private updateQueryParams(): void {
    this.queryParams = this.route.queryParams;
    this.queryParamsSnapshot = this.route.snapshot.queryParams;
  }

  private setTitle(data: AppRouteData): void {
    const toTranslate = [this.translate.get('title')];

    if (data?.title) {
      toTranslate.push(this.translate.get(data.title));
    }

    forkJoin(toTranslate)
      .pipe(untilDestroyed(this))
      .subscribe(([appTitle, routeTitle]) => this.title.setTitle(`${appTitle} - ${routeTitle}`));
  }

  private collectParams(snapshot: ActivatedRouteSnapshot, params: Params = {}): Params {
    return snapshot.children.reduce(
      (aggregate, current) => this.collectParams(current, aggregate),
      Object.assign({}, params, snapshot.params),
    );
  }
}
