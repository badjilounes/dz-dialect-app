import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-training-toolbar-bottom',
  templateUrl: './training-toolbar-bottom.component.html',
  styleUrls: ['./training-toolbar-bottom.component.scss'],
})
export class TrainingToolbarBottomComponent implements OnInit {
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

    {
      activeImage: 'sign-in-active',
      image: 'sign-in',
      link: '/sign-in',
      label: 'sign-in',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
