import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CardComponent } from '../../../../../../shared/design-system/card/card.component';
import { FullLineCardButtonComponent } from '../../../../../../shared/design-system/full-line-card-button/full-line-card-button.component';
import {
  CardItem,
  FullLineCardItemComponent,
} from '../../../../../../shared/design-system/full-line-card-item/full-line-card-item.component';

@Component({
  selector: 'app-success-list',
  templateUrl: './success-list.component.html',
  styleUrls: ['./success-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    TranslateModule,
    MatDividerModule,
    FullLineCardItemComponent,
    FullLineCardButtonComponent,
    MatIconModule,
    RouterModule,
    MatButtonModule,
  ],
})
export class SuccessListComponent {
  @Input() items: CardItem[] = [];
  @Input() maxItems: number = 3;

  get hasMoreItems(): boolean {
    return this.items.length > this.maxItems;
  }
}
