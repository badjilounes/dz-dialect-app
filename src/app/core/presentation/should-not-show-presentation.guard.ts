import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { GuestIdService } from 'src/app/core/guest/guest-id.service';
import { StudentHttpService } from 'src/clients/dz-dialect-training-api';

@Injectable({
  providedIn: 'root'
})
export class ShouldNotShowPresentationGuard implements CanActivate {

  constructor(private readonly studentHttpService: StudentHttpService, private readonly router: Router, private readonly guestIdService: GuestIdService) {}

  canActivate(): Observable<boolean> {
    return this.studentHttpService.shouldShowPresentation(this.guestIdService.guestId).pipe(
      map(response => !response.showPresentation),
      tap(shouldNotShowPresentation => {
        if (!shouldNotShowPresentation) {
          this.router.navigate(['/overview']);
        }
      })
    );
  }

}
