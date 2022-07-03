import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingRandomComponent } from './training-random.page';

describe('TrainingRandomComponent', () => {
  let component: TrainingRandomComponent;
  let fixture: ComponentFixture<TrainingRandomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainingRandomComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TrainingRandomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
