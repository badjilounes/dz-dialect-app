import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class AccountPage implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
