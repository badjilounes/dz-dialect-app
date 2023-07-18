import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { TranslateModule } from '@ngx-translate/core';

export type CardItem = {
  title: string;
  description: string;
  image: string;
  progress?: { value: number; max: number; color: string };
};

@Component({
  selector: 'app-full-line-card-item',
  templateUrl: './full-line-card-item.component.html',
  styleUrls: ['./full-line-card-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [TranslateModule, CommonModule, MatCardModule, MatButtonModule, MatProgressBarModule],
  host: {
    class: 'app-full-line-card-item',
  },
})
export class FullLineCardItemComponent {}
