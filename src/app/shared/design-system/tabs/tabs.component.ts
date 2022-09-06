import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { fromEvent, map, tap } from 'rxjs';

export type TabItem = {
  label: string;
  link: string;
};

@UntilDestroy()
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatTabsModule, MatDividerModule, RouterModule],
})
export class TabsComponent implements AfterViewInit {
  @Input() tabs: TabItem[] = [];

  @ViewChild('shadow') shadow!: ElementRef<HTMLElement>;
  @ViewChild('tabContent') content!: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    fromEvent(this.content.nativeElement, 'scroll')
      .pipe(
        map(() => this.content.nativeElement.scrollTop > 0),
        tap((isScrolling) =>
          isScrolling
            ? this.shadow.nativeElement.classList.add('shadow')
            : this.shadow.nativeElement.classList.remove('shadow'),
        ),
        untilDestroyed(this),
      )
      .subscribe();
  }
}
