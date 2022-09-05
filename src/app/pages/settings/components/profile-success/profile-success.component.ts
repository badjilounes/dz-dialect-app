import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FullLineCardButtonComponent } from 'src/app/shared/design-system/full-line-card-button/full-line-card-button.component';
import {
  CardItem,
  FullLineCardItemComponent,
} from 'src/app/shared/design-system/full-line-card-item/full-line-card-item.component';
import { CardComponent } from '../../../../shared/design-system/card/card.component';

@Component({
  selector: 'app-profile-statistics',
  templateUrl: './profile-success.component.html',
  styleUrls: ['./profile-success.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CardComponent,
    TranslateModule,
    MatDividerModule,
    FullLineCardItemComponent,
    CommonModule,
    FullLineCardButtonComponent,
    MatIconModule,
    RouterModule,
  ],
})
export class ProfileSuccessComponent {
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
    ];
  }
}
