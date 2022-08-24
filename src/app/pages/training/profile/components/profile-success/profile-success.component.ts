import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { FullLineCardButtonComponent } from 'src/app/shared/business/full-line-card-button/full-line-card-button.component';
import { SuccessCardComponent } from '../../../../../shared/business/success-card/success-card.component';
import { ProfileCardComponent } from '../profile-card/profile-card.component';
import {Success} from "../../../../../../clients/dz-dialect-api/model/success";
import {RouterModule} from "@angular/router";



@Component({
  selector: 'app-profile-statistics',
  templateUrl: './profile-success.component.html',
  styleUrls: ['./profile-success.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ProfileCardComponent,
    TranslateModule,
    MatDividerModule,
    SuccessCardComponent,
    CommonModule,
    FullLineCardButtonComponent,
    MatIconModule,
    RouterModule,
  ],
})
export class ProfileSuccessComponent implements OnInit {
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
       image: 'assets/images/badge_gold.svg',
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
   ];
   // return this.successService.getSuccessList(); //TODO implements success service
 }
  constructor() {}

  ngOnInit(): void {}
}