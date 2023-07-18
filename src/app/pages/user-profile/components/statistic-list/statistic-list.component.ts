import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardComponent } from '../../../../shared/design-system/card/card.component';
import { FullLineCardItemComponent } from '../../../../shared/design-system/full-line-card-item/full-line-card-item.component';
import { STATISTIC_ITEMS } from './statistic-items';

export type StatisticItem = {
  value: number;
  description: string;
  image: {
    active: string;
    inactive: string;
  };
};

@Component({
  selector: 'app-statistic-list',
  templateUrl: './statistic-list.component.html',
  styleUrls: ['./statistic-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, CardComponent, FullLineCardItemComponent],
})
export class StatisticListComponent {
  items = STATISTIC_ITEMS;
}
