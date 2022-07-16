import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingPresentationResultComponent } from './training-presentation-result.component';

describe('TrainingResultComponent', () => {
  let component: TrainingPresentationResultComponent;
  let fixture: ComponentFixture<TrainingPresentationResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainingPresentationResultComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingPresentationResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
