import {Component, Input, OnInit} from '@angular/core';
import {AppStore} from "../../../app.store";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {TranslateModule} from "@ngx-translate/core";
import {MatProgressBarModule} from "@angular/material/progress-bar";

@Component({
  selector: 'app-success-card',
  templateUrl: './success-card.component.html',
  styleUrls: ['./success-card.component.scss'],
  standalone: true,
  imports: [MatCardModule, MatButtonModule, TranslateModule, MatProgressBarModule],
})
export class SuccessCardComponent implements OnInit {
  @Input() success: any;
  get progressSuccess(): number {
    return this.success.score / this.success.total * 100

  }

  isHandset$ = this.appStore.isHandset$;

  constructor(private readonly appStore: AppStore) {
  }

  ngOnInit(): void {
  }

}
