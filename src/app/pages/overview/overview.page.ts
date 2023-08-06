import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { LetModule } from '@ngrx/component';
import { OverviewComponent } from 'src/app/pages/overview/components/overview/overview.component';
import { PresentationResultComponent } from 'src/app/pages/overview/components/presentation-result/presentation-result.component';
import { PresentationComponent } from 'src/app/pages/overview/components/presentation/presentation.component';
import { OverviewStore } from 'src/app/pages/overview/store/overview.store';
import { ThemeService } from '../../core/theme/theme.service';

@Component({
  templateUrl: './overview.page.html',
  styleUrls: ['./overview.page.scss'],
  standalone: true,
  providers: [OverviewStore],
  imports: [
    MatProgressSpinnerModule,
    CommonModule,
    LetModule,
    OverviewComponent,
    PresentationComponent,
    PresentationResultComponent,
  ],
})
export class OverviewPage implements OnDestroy {
  showResult$ = this._store.showResult$;
  showOverview$ = this._store.showOverview$;
  showPresentation$ = this._store.showPresentation$;
  showLoader$ = this._store.showLoader$;

  presentationExamId$ = this._store.presentationExamId$;
  result$ = this._store.result$;

  constructor(private readonly _store: OverviewStore, private readonly _theme: ThemeService) {}

  ngOnDestroy(): void {
    this._theme.applyThemeToStatusBar();
  }
}
