import { Component, Input } from '@angular/core';
import { ToolbarComponent } from '../../../../shared/design-system/toolbar/toolbar.component';
import { RouterLink } from '@angular/router';
import { MatLegacyButtonModule } from '@angular/material/legacy-button';

@Component({
  selector: 'app-train-toolbar',
  templateUrl: './train-toolbar.component.html',
  styleUrls: ['./train-toolbar.component.scss'],
  standalone: true,
  imports: [ToolbarComponent, RouterLink, MatLegacyButtonModule],
})
export class TrainToolbarComponent {
  @Input() picture?: string;

  get userPicture(): string {
    return this.picture || '/assets/images/unknown-user.png';
  }
}
