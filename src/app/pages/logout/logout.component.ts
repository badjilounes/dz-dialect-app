import { Component, OnInit } from '@angular/core';
import { AppStore } from '../../app.store';
import { Router } from '@angular/router';

@Component({
  template: '',
  standalone: true,
})
export class LogoutComponent implements OnInit {
  constructor(private readonly appStore: AppStore, private readonly router: Router) {}

  ngOnInit(): void {
    this.appStore.setAsUnAuthenticated();
    this.router.navigate(['/train']);
  }
}
