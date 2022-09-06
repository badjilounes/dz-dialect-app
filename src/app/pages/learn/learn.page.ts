import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LetModule } from '@ngrx/component';
import { TranslateModule } from '@ngx-translate/core';
import { SubNavigationComponent } from 'src/app/shared/design-system/sub-navigation/sub-navigation.component';

@Component({
  selector: 'app-learn',
  templateUrl: './learn.page.html',
  styleUrls: ['./learn.page.scss'],
  standalone: true,
  imports: [CommonModule, TranslateModule, LetModule, SubNavigationComponent],
})
export class LearnPage {
  links = [
    {
      label: 'Aléatoire',
      link: 'random',
      icon: 'auto_mode_outline',
    },
    {
      label: 'Par verbe',
      link: 'keyword',
      icon: 'edit_square_outline',
    },
  ];
}
