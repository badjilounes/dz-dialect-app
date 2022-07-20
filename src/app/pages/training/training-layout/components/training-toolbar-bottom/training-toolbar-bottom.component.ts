import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ToolbarLink } from '../../training-toolbar-link';

@Component({
  selector: 'app-training-toolbar-bottom',
  templateUrl: './training-toolbar-bottom.component.html',
  styleUrls: ['./training-toolbar-bottom.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingToolbarBottomComponent {
  @Input() tabs: ToolbarLink[] = [];
}
