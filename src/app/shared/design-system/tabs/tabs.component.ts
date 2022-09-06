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

export type TabItem = {
  label: string;
  link: string;
};

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
    this.content.nativeElement.addEventListener('scroll', (event) => {
      console.log(this.content.nativeElement.scrollTop);
      console.log(event);

      // add shadow when scrolled
      if (this.content.nativeElement.scrollTop > 0) {
        this.shadow.nativeElement.classList.add('shadow');
      } else {
        this.shadow.nativeElement.classList.remove('shadow');
      }
    });
  }
}
