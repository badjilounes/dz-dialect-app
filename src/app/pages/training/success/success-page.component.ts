import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Success} from "../../../../clients/dz-dialect-api/model/success";
import {ProfileCardComponent} from "../profile/components/profile-card/profile-card.component";
import {TranslateModule} from "@ngx-translate/core";
import {MatDividerModule} from "@angular/material/divider";
import {SuccessCardComponent} from "../../../shared/business/success-card/success-card.component";
import {CommonModule} from "@angular/common";
import {
  FullLineCardButtonComponent
} from "../../../shared/business/full-line-card-button/full-line-card-button.component";
import {MatIconModule} from "@angular/material/icon";
import {Router, RouterModule} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-success-page',
  templateUrl: './success-page.component.html',
  styleUrls: ['./success-page.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProfileCardComponent,
    TranslateModule,
    MatDividerModule,
    SuccessCardComponent,
    CommonModule,
    FullLineCardButtonComponent,
    MatIconModule,
    RouterModule,
    MatButtonModule,],
})
export class SuccessPageComponent implements OnInit {

  get successList(): Success[] {
    return [
      {
        title: 'Tout feu tout flamme',
        icon: 'check_circle',
        color: '#00bcd4',
        image: 'assets/images/badge_gold.svg',
        description: 'Réaliser une série de 10 jours',
        score: 8,
        total: 10,
      },
      {
        title: 'Grand sage',
        icon: 'check_circle',
        color: '#00bcd4',
        image: 'assets/images/badge_bronze.svg',
        description: 'Gagner 50 XP',
        score: 28,
        total: 50,
      },
      {
        title: 'Mastodonte',
        icon: 'check_circle',
        color: '#00bcd4',
        image: 'assets/images/badge_silver.svg',
        description: 'Finissez tous les succès pour parler bilingue',
        score: 10,
        total: 100,
      },
      {
        title: 'Tout feu tout flamme',
        icon: 'check_circle',
        color: '#00bcd4',
        image: 'assets/images/badge_bronze.svg',
        description: 'Réaliser une série de 10 jours',
        score: 8,
        total: 10,
      },
      {
        title: 'Grand sage',
        icon: 'check_circle',
        color: '#00bcd4',
        image: 'assets/images/badge_silver.svg',
        description: 'Gagner 50 XP',
        score: 28,
        total: 50,
      },
      {
        title: 'Mastodonte',
        icon: 'check_circle',
        color: '#00bcd4',
        image: 'assets/images/badge_gold.svg',
        description: 'Finissez tous les succès pour parler bilingue',
        score: 10,
        total: 100,
      },
      {
        title: 'Tout feu tout flamme',
        icon: 'check_circle',
        color: '#00bcd4',
        image: 'assets/images/badge_gold.svg',
        description: 'Réaliser une série de 10 jours',
        score: 8,
        total: 10,
      },
      {
        title: 'Grand sage',
        icon: 'check_circle',
        color: '#00bcd4',
        image: 'assets/images/badge_silver.svg',
        description: 'Gagner 50 XP',
        score: 28,
        total: 50,
      },
      {
        title: 'Mastodonte',
        icon: 'check_circle',
        color: '#00bcd4',
        image: 'assets/images/badge_silver.svg',
        description: 'Finissez tous les succès pour parler bilingue',
        score: 10,
        total: 100,
      },
    ];
  }

  constructor(private readonly router: Router) {
  }



  ngOnInit(): void {
  }

  onBack() {
    this.router.navigate(['/profile']);
  }
}
