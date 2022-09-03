import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { LetModule } from '@ngrx/component';
import { AppStore } from 'src/app/app.store';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatCardModule, LetModule],
})
export class ProfileCardComponent implements OnInit {
  isHandset$ = this.appStore.isHandset$;

  constructor(private readonly appStore: AppStore) {}

  ngOnInit(): void {}
}
