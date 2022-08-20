import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { LetModule } from '@ngrx/component';
import { TranslateModule } from '@ngx-translate/core';
import { AppStore } from 'src/app/app.store';
import { FullLineCardButtonComponent } from 'src/app/shared/business/full-line-card-button/full-line-card-button.component';

export type ProfileInformation = {
  name: string;
  username: string;
  createdAt: string;
  friendsCount: number;
  picture: string;
};

@Component({
  selector: 'app-profile-information',
  templateUrl: './profile-information.component.html',
  styleUrls: ['./profile-information.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    LetModule,
    MatCardModule,
    TranslateModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatDividerModule,
    FullLineCardButtonComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileInformationComponent implements OnInit {
  @Input() information: ProfileInformation | null = null;

  isHandset$ = this.appStore.isHandset$;

  constructor(private readonly appStore: AppStore) {}

  ngOnInit(): void {}
}
