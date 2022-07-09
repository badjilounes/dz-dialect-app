import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingPresentationOverviewComponent } from './training-presentation-overview.component';

describe('TrainingHomeComponent', () => {
  let component: TrainingPresentationOverviewComponent;
  let fixture: ComponentFixture<TrainingPresentationOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainingPresentationOverviewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingPresentationOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
