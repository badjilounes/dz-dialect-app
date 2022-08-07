import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sign-alternative',
  templateUrl: './sign-alternative.component.html',
  styleUrls: ['./sign-alternative.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignAlternativeComponent {
  @Output() alternativeSelected: EventEmitter<string> = new EventEmitter<string>();

  signInWithTwitter() {
    this.alternativeSelected.emit('twitter');
  }
}
