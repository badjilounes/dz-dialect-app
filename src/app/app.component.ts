import { Component } from '@angular/core';
import { AppStore } from './app.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'DZDialect';

  constructor(private readonly appStore: AppStore) {
    this.appStore.initStore();
  }
}
