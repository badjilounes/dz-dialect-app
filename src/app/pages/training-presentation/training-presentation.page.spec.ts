import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingPresentationPage } from './training-presentation.page';

describe('TrainingRandomComponent', () => {
  let component: TrainingPresentationPage;
  let fixture: ComponentFixture<TrainingPresentationPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainingPresentationPage],
    }).compileComponents();

    fixture = TestBed.createComponent(TrainingPresentationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
