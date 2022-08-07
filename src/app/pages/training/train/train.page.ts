import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserAppStore } from 'src/app/core/stores/user.app-store';

@Component({
  selector: 'app-train',
  templateUrl: './train.page.html',
  styleUrls: ['./train.page.scss'],
})
export class TrainPage implements OnInit {
  constructor(
    private readonly route: ActivatedRoute,
    private readonly userAppStore: UserAppStore,
  ) {}

  ngOnInit(): void {
    const accessToken = this.route.snapshot.queryParams['access_token'];
    if (accessToken) {
      this.userAppStore.setAsAuthenticated(accessToken);
    }
  }
}
