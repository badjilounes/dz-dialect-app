import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { MatProgressBar, MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, MatProgressBarModule],
})
export class ProgressBarComponent implements OnChanges {
  @Input() value = 0;

  @ViewChild(MatProgressBar, { static: true }) progressBar!: MatProgressBar;

  constructor(private readonly renderer: Renderer2) {}

  ngOnChanges(): void {
    // eslint-disable-next-line no-underscore-dangle
    const [, progress] = Array.from(this.progressBar._elementRef.nativeElement.children);
    this.renderer.setStyle(progress, 'width', `${this.value}%`);
  }
}
