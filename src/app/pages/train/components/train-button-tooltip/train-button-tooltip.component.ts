import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export type TrainButtonTooltip = {
  text: string;
  color: string;
};

@Component({
  selector: 'app-train-button-tooltip',
  templateUrl: './train-button-tooltip.component.html',
  styleUrls: ['./train-button-tooltip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class TrainButtonTooltipComponent {
  @Input() offsetX = 0;
  @Input() data!: TrainButtonTooltip;
}
