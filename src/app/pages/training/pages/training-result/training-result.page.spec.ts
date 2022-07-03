import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingResultComponent } from './training-result.page';

describe('TrainingResultComponent', () => {
  let component: TrainingResultComponent;
  let fixture: ComponentFixture<TrainingResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainingResultComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
