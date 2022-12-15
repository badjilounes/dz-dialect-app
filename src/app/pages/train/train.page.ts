import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppStore } from 'src/app/app.store';

const sections = [
  {
    number: 1,
    description: 'Utilise des mots de base, présente-toi',
  },
  {
    number: 2,
    description: 'Dis comment tu vas, communique en voyage',
  },
  {
    number: 3,
    description: 'Commande au restaurant',
  },
];

@Component({
  selector: 'app-train',
  templateUrl: './train.page.html',
  styleUrls: ['./train.page.scss'],
})
export class TrainPage implements OnInit {
  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly userAppStore: AppStore,
  ) {}
  sectionList = sections;
  ngOnInit(): void {
    const accessToken = this.route.snapshot.queryParams['access_token'];
    if (accessToken) {
      this.router
        .navigate(['/train'], { replaceUrl: true })
        .then(() => this.userAppStore.setAsAuthenticated(accessToken));
    }
  }
}
