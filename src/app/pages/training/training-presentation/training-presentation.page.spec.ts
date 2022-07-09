import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingPresentationpAGE } from './training-presentation.page';

describe('TrainingRandomComponent', () => {
  let component: TrainingPresentationpAGE;
  let fixture: ComponentFixture<TrainingPresentationpAGE>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainingPresentationpAGE],
    }).compileComponents();

    fixture = TestBed.createComponent(TrainingPresentationpAGE);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
