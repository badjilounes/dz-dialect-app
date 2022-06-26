import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingResponseComponent } from './training-response.component';

describe('TrainingResponseComponent', () => {
  let component: TrainingResponseComponent;
  let fixture: ComponentFixture<TrainingResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingResponseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
