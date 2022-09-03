import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingToolbarTopComponent } from './training-toolbar-top.component';

describe('TrainingHomeToolbarTopComponent', () => {
  let component: TrainingToolbarTopComponent;
  let fixture: ComponentFixture<TrainingToolbarTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainingToolbarTopComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TrainingToolbarTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
