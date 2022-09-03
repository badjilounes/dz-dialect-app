import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FullLineCardButtonComponent } from 'src/app/shared/business/full-line-card-button/full-line-card-button.component';
import { SuccessCardComponent } from 'src/app/shared/business/success-card/success-card.component';
import { Success } from 'src/clients/dz-dialect-api/model/success';
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
    SuccessCardComponent,
    CommonModule,
    FullLineCardButtonComponent,
    MatIconModule,
    RouterModule,
    MatButtonModule,
  ],
})
export class SuccessPage {
  get successList(): Success[] {
    return [
      {
        title: 'Tout feu tout flamme',
        icon: 'check_circle',
        color: '#00bcd4',
        image: 'assets/images/badge_gold.svg',
        description: 'Réaliser une série de 10 jours',
        score: 8,
        total: 10,
      },
      {
        title: 'Grand sage',
        icon: 'check_circle',
        color: '#00bcd4',
        image: 'assets/images/badge_bronze.svg',
        description: 'Gagner 50 XP',
        score: 28,
        total: 50,
      },
      {
        title: 'Mastodonte',
        icon: 'check_circle',
        color: '#00bcd4',
        image: 'assets/images/badge_silver.svg',
        description: 'Finissez tous les succès pour parler bilingue',
        score: 10,
        total: 100,
      },
      {
        title: 'Tout feu tout flamme',
        icon: 'check_circle',
        color: '#00bcd4',
        image: 'assets/images/badge_bronze.svg',
        description: 'Réaliser une série de 10 jours',
        score: 8,
        total: 10,
      },
      {
        title: 'Grand sage',
        icon: 'check_circle',
        color: '#00bcd4',
        image: 'assets/images/badge_silver.svg',
        description: 'Gagner 50 XP',
        score: 28,
        total: 50,
      },
      {
        title: 'Mastodonte',
        icon: 'check_circle',
        color: '#00bcd4',
        image: 'assets/images/badge_gold.svg',
        description: 'Finissez tous les succès pour parler bilingue',
        score: 10,
        total: 100,
      },
      {
        title: 'Tout feu tout flamme',
        icon: 'check_circle',
        color: '#00bcd4',
        image: 'assets/images/badge_gold.svg',
        description: 'Réaliser une série de 10 jours',
        score: 8,
        total: 10,
      },
      {
        title: 'Grand sage',
        icon: 'check_circle',
        color: '#00bcd4',
        image: 'assets/images/badge_silver.svg',
        description: 'Gagner 50 XP',
        score: 28,
        total: 50,
      },
      {
        title: 'Mastodonte',
        icon: 'check_circle',
        color: '#00bcd4',
        image: 'assets/images/badge_silver.svg',
        description: 'Finissez tous les succès pour parler bilingue',
        score: 10,
        total: 100,
      },
    ];
  }
}
