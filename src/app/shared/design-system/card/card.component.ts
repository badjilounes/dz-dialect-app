import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { LetModule } from '@ngrx/component';
import { AppStore } from 'src/app/app.store';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatCardModule, LetModule],
  host: { class: 'app-card' },
})
export class CardComponent {
  isHandset$ = this.appStore.isHandset$;

  constructor(private readonly appStore: AppStore) {}
}
