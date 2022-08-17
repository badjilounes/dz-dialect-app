import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, shareReplay } from 'rxjs';
import { AppStore } from 'src/app/app.store';

@Component({
  selector: 'app-training-toolbar-top',
  templateUrl: './training-toolbar-top.component.html',
  styleUrls: ['./training-toolbar-top.component.scss'],
})
export class TrainingToolbarTopComponent {
  isMobile$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.XSmall]).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  userImage$: Observable<string | undefined> = this.userAppStore.user$.pipe(
    map((user) => user?.imageUrl || '/assets/images/unkwown-user.jpg'),
    shareReplay(),
  );

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
  ];

  isAuthenticated$ = this.userAppStore.isAuthenticated$;

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly userAppStore: AppStore,
    private readonly router: Router,
  ) {}

  signOut(): void {
    this.userAppStore.setAsUnAuthenticated();
    this.router.navigate(['/train']);
  }
}
