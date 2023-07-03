import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatSidenavContent, MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { LetModule } from '@ngrx/component';
import { map, tap } from 'rxjs';

export type SidenavItem = {
  label: string;
  link: string;
  icon: string;
};

@UntilDestroy()
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  standalone: true,
  imports: [CommonModule, MatSidenavModule, MatListModule, RouterModule, MatIconModule, LetModule],
})
export class SidenavComponent implements AfterViewInit {
  @Input() items: SidenavItem[] = [];

  @ViewChild(MatSidenavContent) content!: MatSidenavContent;
  @ViewChild('shadow') shadow!: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    this.content
      .elementScrolled()
      .pipe(
        map(() => this.content.measureScrollOffset('top') > 0),
        tap((hasShadow) =>
          hasShadow
            ? this.shadow.nativeElement.classList.add('shadow')
            : this.shadow.nativeElement.classList.remove('shadow'),
        ),
        untilDestroyed(this),
      )
      .subscribe();
  }
}
