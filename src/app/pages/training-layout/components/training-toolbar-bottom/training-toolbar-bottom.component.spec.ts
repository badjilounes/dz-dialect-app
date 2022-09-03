import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingToolbarBottomComponent } from './training-toolbar-bottom.component';

describe('TrainingHomeToolbarBottomComponent', () => {
  let component: TrainingToolbarBottomComponent;
  let fixture: ComponentFixture<TrainingToolbarBottomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainingToolbarBottomComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TrainingToolbarBottomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
