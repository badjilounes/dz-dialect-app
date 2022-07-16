import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';

@Component({
  selector: 'app-training-toolbar-top',
  templateUrl: './training-toolbar-top.component.html',
  styleUrls: ['./training-toolbar-top.component.scss'],
})
export class TrainingToolbarTopComponent implements OnInit {
  isMobile$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.XSmall]).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  links = [
    {
      activeImage: 'train-active',
      image: 'train',
      link: '/train',
      label: 'train',
    },
    {
      activeImage: 'learn-active',
      image: 'learn',
      link: '/learn',
      label: 'learn',
    },
  ];

  constructor(private readonly breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {}
}
