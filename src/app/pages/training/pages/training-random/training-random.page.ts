import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';

@Component({
  selector: 'app-training-random',
  templateUrl: './training-random.page.html',
  styleUrls: ['./training-random.page.scss'],
})
export class TrainingRandomComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  constructor(private readonly breakpointObserver: BreakpointObserver) {}
}
