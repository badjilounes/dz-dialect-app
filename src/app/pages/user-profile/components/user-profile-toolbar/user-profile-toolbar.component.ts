import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ToolbarComponent } from '../../../../shared/design-system/toolbar/toolbar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { switchMap } from 'rxjs';
import { filterUndefined } from '../../../../shared/technical/operators/filter-undefined.operator';
import { RoutingService } from '../../../../core/routing/routing.service';
import { LetModule } from '@ngrx/component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-profile-toolbar',
  templateUrl: './user-profile-toolbar.component.html',
  styleUrls: ['./user-profile-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LetModule,
    TranslateModule,
    ToolbarComponent,
    MatButtonModule,
    MatIconModule,
  ],
})
export class UserProfileToolbarComponent {
  title$ = this.routing.currentRoute$.pipe(
    filterUndefined(),
    switchMap((route) => this.translate.get(route.data['title'])),
  );

  constructor(
    private readonly routing: RoutingService,
    private readonly translate: TranslateService,
  ) {}
}
