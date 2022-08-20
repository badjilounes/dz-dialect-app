import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AppStore } from 'src/app/app.store';
import { filterUndefined } from 'src/app/shared/technical/operators/filter-undefined.operator';
import { ProfileInformation } from './components/profile-information/profile-information.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userInformation$: Observable<ProfileInformation> = this.appStore.user$.pipe(
    filterUndefined(),
    map((user) => ({
      name: user.name,
      username: user.username,
      createdAt: user.createdAt,
      friendsCount: 0,
      picture: user.imageUrl,
    })),
  );

  constructor(private readonly appStore: AppStore, private readonly router: Router) {}

  ngOnInit() {}

  logOut() {
    this.appStore.setAsUnAuthenticated();
    this.router.navigate(['/train']);
  }
}
