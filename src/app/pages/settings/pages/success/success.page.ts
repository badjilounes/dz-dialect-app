import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SuccessListComponent } from '../user-profile/components/success-list/success-list.component';
import { SUCCESS_ITEMS } from '../user-profile/models/success-items';

@Component({
  selector: 'app-success-page',
  templateUrl: './success.page.html',
  styleUrls: ['./success.page.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SuccessListComponent],
})
export class SuccessPage {
  items = SUCCESS_ITEMS;
}
