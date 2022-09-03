import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { LetModule } from '@ngrx/component';
import { AppStore } from 'src/app/app.store';

@Component({
  selector: 'app-full-line-card-button',
  templateUrl: './full-line-card-button.component.html',
  styleUrls: ['./full-line-card-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatButtonModule, CommonModule, LetModule],
})
export class FullLineCardButtonComponent {
  @Input() disabled = false;

  isHandset$ = this.appStore.isHandset$;

  constructor(private readonly appStore: AppStore) {}
}
