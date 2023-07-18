import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MAT_PROGRESS_BAR_DEFAULT_OPTIONS } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CardComponent } from '../../../../shared/design-system/card/card.component';
import { FullLineCardButtonComponent } from '../../../../shared/design-system/full-line-card-button/full-line-card-button.component';
import { FullLineCardItemComponent } from '../../../../shared/design-system/full-line-card-item/full-line-card-item.component';
import { LetModule } from '@ngrx/component';
import { ProgressBarComponent } from '../../../../shared/design-system/progress-bar/progress-bar.component';
import { AppStore } from '../../../../app.store';

export type SuccessItem = {
  title: string;
  description: string;
  image: string;
  progress: { value: number; max: number };
};

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
    ProgressBarComponent,
    LetModule,
  ],
  providers: [
    {
      provide: MAT_PROGRESS_BAR_DEFAULT_OPTIONS,
      useValue: { mode: 'determinate', color: 'primary' },
    },
  ],
})
export class SuccessListComponent {
  @Input() items: SuccessItem[] = [];
  @Input() maxItems: number = 3;

  get hasMoreItems(): boolean {
    return this.items.length > this.maxItems;
  }

  isSmallScreen$ = this.appStore.isSmallScreen$;

  constructor(private readonly appStore: AppStore) {}
}
