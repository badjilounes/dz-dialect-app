import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnPage } from './learn.page';

describe('TrainingHomeComponent', () => {
  let component: LearnPage;
  let fixture: ComponentFixture<LearnPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LearnPage],
    }).compileComponents();

    fixture = TestBed.createComponent(LearnPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
