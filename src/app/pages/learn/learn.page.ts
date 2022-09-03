import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { LetModule } from '@ngrx/component';
import { TranslateModule } from '@ngx-translate/core';
import { KeywordComponent } from './components/keyword/keyword.component';
import { RandomComponent } from './components/random/random.component';

@Component({
  selector: 'app-learn',
  templateUrl: './learn.page.html',
  styleUrls: ['./learn.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    LetModule,
    MatButtonToggleModule,
    KeywordComponent,
    RandomComponent,
  ],
})
export class LearnPage implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
