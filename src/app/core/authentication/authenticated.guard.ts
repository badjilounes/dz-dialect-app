import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { AppStore } from '../../app.store';

@Injectable({
  providedIn: 'root',
})
export class AuthenticatedGuard implements CanActivate {
  constructor(private readonly router: Router, private readonly userAppStore: AppStore) {}

  canActivate(): Observable<boolean> {
    return this.userAppStore.isAuthenticated$.pipe(
      take(1),
      map((isAuthenticated) => {
        if (!isAuthenticated) {
          this.router.navigate(['/sign-in']);
          return false;
        }
        return true;
      }),
    );
  }
}
