import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { switchMap } from 'rxjs';
import { RoutingService } from 'src/app/core/routing/routing.service';
import { CardComponent } from 'src/app/shared/design-system/card/card.component';
import { ToolbarComponent } from 'src/app/shared/design-system/toolbar/toolbar.component';
import { filterUndefined } from 'src/app/shared/technical/operators/filter-undefined.operator';
import { PageLayoutDirective } from '../../../../core/layout/directives/is-page-layout.directive';
import { ThemeService } from '../../../../core/theme/theme.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    ToolbarComponent,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    CardComponent,
    CommonModule,
  ],
  hostDirectives: [PageLayoutDirective],
})
export class ProfileEditPage implements OnInit {
  title$ = this._routing.currentRoute$.pipe(
    filterUndefined(),
    switchMap((route) => this._translate.get(route.data['title'])),
  );

  subtitle$ = this._routing.currentRoute$.pipe(
    filterUndefined(),
    switchMap((route) => this._translate.get(route.data['subtitle'])),
  );

  constructor(
    private readonly _routing: RoutingService,
    private readonly _theme: ThemeService,
    private readonly _translate: TranslateService,
  ) {}

  ngOnInit(): void {
    this._theme.applyThemeToStatusBar();
  }
}
