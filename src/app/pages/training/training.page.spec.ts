import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingPage } from './training.page';

describe('TrainingComponent', () => {
  let component: TrainingPage;
  let fixture: ComponentFixture<TrainingPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainingPage],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
