import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SuccessListComponent } from '../../components/success-list/success-list.component';
import { SUCCESS_ITEMS } from '../../components/success-list/success-items';
import { PageLayoutDirective } from '../../../../core/layout/directives/is-page-layout.directive';

@Component({
  selector: 'app-success-page',
  templateUrl: './success.page.html',
  styleUrls: ['./success.page.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SuccessListComponent],
  hostDirectives: [PageLayoutDirective],
})
export class SuccessPage {
  items = SUCCESS_ITEMS;
}
