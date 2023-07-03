import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { LetModule } from '@ngrx/component';
import { Observable, map } from 'rxjs';
import { AppStore } from '../../../../../../app.store';
import { filterUndefined } from '../../../../../../shared/technical/operators/filter-undefined.operator';
import { ProfileInformation } from '../../../profile/components/profile-information/profile-information.component';

@Component({
  selector: 'app-user-profile-information',
  templateUrl: './user-profile-information.component.html',
  styleUrls: ['./user-profile-information.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LetModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
  ],
})
export class UserProfileInformationComponent implements OnInit {
  userInformation$: Observable<ProfileInformation> = this.appStore.user$.pipe(
    filterUndefined(),
    map((user) => ({
      name: user.name,
      username: user.username,
      createdAt: user.createdAt,
      friendsCount: 0,
      picture: user.imageUrl,
      email: user.email,
    })),
  );

  isSmallScreen$ = this.appStore.isSmallScreen$;

  constructor(private readonly appStore: AppStore) {}

  ngOnInit(): void {}
}
