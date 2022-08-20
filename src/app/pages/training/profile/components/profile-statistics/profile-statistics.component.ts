import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { FullLineCardButtonComponent } from 'src/app/shared/business/full-line-card-button/full-line-card-button.component';
import { SuccessCardComponent } from '../../../../../shared/business/success-card/success-card.component';
import { ProfileCardComponent } from '../profile-card/profile-card.component';

type Success = {
  title: string;
  value: number;
  icon: string;
  color: string;
  image: string;
};

@Component({
  selector: 'app-profile-statistics',
  templateUrl: './profile-statistics.component.html',
  styleUrls: ['./profile-statistics.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ProfileCardComponent,
    TranslateModule,
    MatDividerModule,
    SuccessCardComponent,
    CommonModule,
    FullLineCardButtonComponent,
    MatIconModule,
  ],
})
export class ProfileStatisticsComponent implements OnInit {
  public successList: Success[] = [
    {
      title: 'Success',
      value: 26,
      icon: 'check_circle',
      color: '#00bcd4',
      image: 'assets/images/badge_gold.svg',
    },
    {
      title: 'Success2',
      value: 15,
      icon: 'check_circle',
      color: '#00bcd4',
      image: 'assets/images/badge_gold.svg',
    },
    {
      title: 'Success3',
      value: 65,
      icon: 'check_circle',
      color: '#00bcd4',
      image: 'assets/images/badge_gold.svg',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
