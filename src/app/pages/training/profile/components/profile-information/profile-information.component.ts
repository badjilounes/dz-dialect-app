import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { AppStore } from 'src/app/app.store';
import { FullLineCardButtonComponent } from 'src/app/shared/business/full-line-card-button/full-line-card-button.component';
import { ProfileCardComponent } from '../profile-card/profile-card.component';

export type ProfileInformation = {
  name: string;
  username: string;
  createdAt: string;
  friendsCount: number;
  picture: string;
};

@Component({
  selector: 'app-profile-information',
  templateUrl: './profile-information.component.html',
  styleUrls: ['./profile-information.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    MatIconModule,
    MatDividerModule,
    FullLineCardButtonComponent,
    ProfileCardComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileInformationComponent implements OnInit {
  @Input() information: ProfileInformation | null = null;

  isHandset$ = this.appStore.isHandset$;

  constructor(private readonly appStore: AppStore) {}

  ngOnInit(): void {}
}
