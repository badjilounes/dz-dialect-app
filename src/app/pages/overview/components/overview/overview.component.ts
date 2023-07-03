import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { RouterModule } from '@angular/router';
import { LetModule } from '@ngrx/component';
import { TranslateModule } from '@ngx-translate/core';
import { map, Observable, shareReplay } from 'rxjs';
import { OverviewStore } from 'src/app/pages/overview/store/overview.store';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    LetModule,
    MatButtonModule,
    TranslateModule,
    RouterModule,
    MatProgressSpinnerModule,
  ],
})
export class OverviewComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium])
    .pipe(
      map((result) => result.matches),
      shareReplay(),
    );

  loading$ = this.overviewStore.isLoading$;

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly overviewStore: OverviewStore,
  ) {}

  startPresentation(): void {
    this.overviewStore.startPresentation();
  }
}
