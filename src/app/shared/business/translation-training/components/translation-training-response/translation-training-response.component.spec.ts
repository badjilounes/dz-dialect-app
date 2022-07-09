import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationTrainingResponseComponent } from './translation-training-response.component';

describe('TrainingResponseComponent', () => {
  let component: TranslationTrainingResponseComponent;
  let fixture: ComponentFixture<TranslationTrainingResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TranslationTrainingResponseComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslationTrainingResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
