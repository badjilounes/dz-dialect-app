import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FullLineCardButtonComponent } from 'src/app/shared/business/full-line-card-button/full-line-card-button.component';
import {
  CardItem,
  FullLineCardItemComponent,
} from 'src/app/shared/business/full-line-card-item/full-line-card-item.component';
import { ProfileCardComponent } from '../profile/components/profile-card/profile-card.component';

@Component({
  selector: 'app-success-page',
  templateUrl: './success.page.html',
  styleUrls: ['./success.page.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ProfileCardComponent,
    TranslateModule,
    MatDividerModule,
    FullLineCardItemComponent,
    CommonModule,
    FullLineCardButtonComponent,
    MatIconModule,
    RouterModule,
    MatButtonModule,
  ],
})
export class SuccessPage {
  get successList(): CardItem[] {
    return [
      {
        title: 'Tout feu tout flamme',
        color: '#00bcd4',
        image: 'assets/images/badge_gold.svg',
        description: 'Réaliser une série de 10 jours',
        progress: {
          value: 8,
          max: 10,
        },
      },
      {
        title: 'Grand sage',
        color: '#00bcd4',
        image: 'assets/images/badge_bronze.svg',
        description: 'Gagner 50 XP',
        progress: {
          value: 28,
          max: 50,
        },
      },
      {
        title: 'Mastodonte',
        color: '#00bcd4',
        image: 'assets/images/badge_silver.svg',
        description: 'Finissez tous les succès pour parler bilingue',
        progress: {
          value: 10,
          max: 100,
        },
      },
      {
        title: 'Tout feu tout flamme',
        color: '#00bcd4',
        image: 'assets/images/badge_gold.svg',
        description: 'Réaliser une série de 10 jours',
        progress: {
          value: 8,
          max: 10,
        },
      },
      {
        title: 'Grand sage',
        color: '#00bcd4',
        image: 'assets/images/badge_bronze.svg',
        description: 'Gagner 50 XP',
        progress: {
          value: 28,
          max: 50,
        },
      },
      {
        title: 'Mastodonte',
        color: '#00bcd4',
        image: 'assets/images/badge_silver.svg',
        description: 'Finissez tous les succès pour parler bilingue',
        progress: {
          value: 10,
          max: 100,
        },
      },
      {
        title: 'Tout feu tout flamme',
        color: '#00bcd4',
        image: 'assets/images/badge_gold.svg',
        description: 'Réaliser une série de 10 jours',
        progress: {
          value: 8,
          max: 10,
        },
      },
      {
        title: 'Grand sage',
        color: '#00bcd4',
        image: 'assets/images/badge_bronze.svg',
        description: 'Gagner 50 XP',
        progress: {
          value: 28,
          max: 50,
        },
      },
      {
        title: 'Mastodonte',
        color: '#00bcd4',
        image: 'assets/images/badge_silver.svg',
        description: 'Finissez tous les succès pour parler bilingue',
        progress: {
          value: 10,
          max: 100,
        },
      },
    ];
  }
}
