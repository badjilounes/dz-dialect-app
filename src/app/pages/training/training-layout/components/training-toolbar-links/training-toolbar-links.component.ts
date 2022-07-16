import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';

export type ToolbarLink = {
  activeImage: string;
  image: string;
  link: string;
  label: string;
};

@Component({
  selector: 'app-training-toolbar-links',
  templateUrl: './training-toolbar-links.component.html',
  styleUrls: ['./training-toolbar-links.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingToolbarLinksComponent implements OnInit {
  @Input() links: ToolbarLink[] = [];

  isDesktop$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.XSmall, Breakpoints.Small])
    .pipe(
      map((result) => !result.matches),
      shareReplay(),
    );

  isMobile$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.XSmall]).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  constructor(private readonly breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {}
}
