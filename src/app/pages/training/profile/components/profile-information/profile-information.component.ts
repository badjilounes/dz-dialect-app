import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { FullLineCardButtonComponent } from 'src/app/shared/business/full-line-card-button/full-line-card-button.component';
import { ProfileCardComponent } from '../profile-card/profile-card.component';

export type ProfileInformation = {
  name: string;
  username: string;
  email: string;
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
export class ProfileInformationComponent {
  @Input() information: ProfileInformation | null = null;
}
