import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { TranslateModule } from '@ngx-translate/core';
import { AppStore } from '../../../app.store';

export type CardItem = {
  title: string;
  description: string;
  image: string;
  progress: { value: number; max: number };
  color: string;
};

@Component({
  selector: 'app-full-line-card-item',
  templateUrl: './full-line-card-item.component.html',
  styleUrls: ['./full-line-card-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatCardModule, MatButtonModule, TranslateModule, MatProgressBarModule],
  host: {
    class: 'app-full-line-card-item',
  },
})
export class FullLineCardItemComponent {
  @Input() item!: CardItem;

  get progress(): number {
    return (this.item.progress.value / this.item.progress.max) * 100;
  }

  isHandset$ = this.appStore.isHandset$;

  constructor(private readonly appStore: AppStore) {}
}
