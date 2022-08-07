import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, shareReplay } from 'rxjs';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { UserService } from 'src/app/core/user/user.service';

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

  userImage$ = this.userService.user$.pipe(
    map((user) => user?.imageUrl ?? 'assets/images/unkwown-user.jpg'),
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

  get isAuthenticated() {
    return this.authenticationService.isAuthenticated();
  }

  constructor(private readonly breakpointObserver: BreakpointObserver, private readonly userService: UserService, private readonly authenticationService: AuthenticationService, private readonly router: Router) {}

  signOut(): void {
    this.authenticationService.setAsUnauthenticated();
    this.router.navigate(['/train']);
  }
}
