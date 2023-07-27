import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { ActivatedRoute, Router } from '@angular/router';
import { LetModule } from '@ngrx/component';
import { Observable, of } from 'rxjs';
import { AppStore } from 'src/app/app.store';
import { PageLayoutDirective } from '../../core/layout/directives/is-page-layout.directive';

@Component({
  selector: 'app-train',
  templateUrl: './train.page.html',
  styleUrls: ['./train.page.scss'],
  standalone: true,
  imports: [MatButtonModule, CommonModule, MatIconModule, LetModule],
  hostDirectives: [PageLayoutDirective],
})
export class TrainPage implements OnInit {
  section$: Observable<any[]> = of([]);

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly userAppStore: AppStore,
  ) {}

  ngOnInit(): void {
    const accessToken = this.route.snapshot.queryParams['access_token'];
    if (accessToken) {
      this.router
        .navigate(['/train'], { replaceUrl: true })
        .then(() => this.userAppStore.setAsAuthenticated(accessToken));
    }
  }
}
