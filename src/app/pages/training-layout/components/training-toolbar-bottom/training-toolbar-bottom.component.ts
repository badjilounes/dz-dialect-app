import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { ToolbarLink } from '../../models/training-toolbar-link';

@Component({
  selector: 'app-training-toolbar-bottom',
  templateUrl: './training-toolbar-bottom.component.html',
  styleUrls: ['./training-toolbar-bottom.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatDividerModule,
    MatToolbarModule,
    MatTabsModule,
    RouterModule,
    MatIconModule,
    CommonModule,
  ],
})
export class TrainingToolbarBottomComponent {
  @Input() tabs: ToolbarLink[] = [];
}
