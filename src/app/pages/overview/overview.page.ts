import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { LetModule } from '@ngrx/component';
import { OverviewComponent } from 'src/app/pages/overview/components/overview/overview.component';
import { PresentationResultComponent } from 'src/app/pages/overview/components/presentation-result/presentation-result.component';
import { PresentationComponent } from 'src/app/pages/overview/components/presentation/presentation.component';
import { OverviewStore } from 'src/app/pages/overview/store/overview.store';

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
export class OverviewPage {
  showResult$ = this.overviewStore.showResult$;
  showOverview$ = this.overviewStore.showOverview$;
  showPresentation$ = this.overviewStore.showPresentation$;
  showLoader$ = this.overviewStore.showLoader$;

  presentation$ = this.overviewStore.presentation$;
  result$ = this.overviewStore.result$;

  constructor(private readonly overviewStore: OverviewStore) {}
}
