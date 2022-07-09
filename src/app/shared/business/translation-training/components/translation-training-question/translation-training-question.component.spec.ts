import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationTrainingQuestionComponent } from './translation-training-question.component';

describe('TranslationTrainingQuestionComponent', () => {
  let component: TranslationTrainingQuestionComponent;
  let fixture: ComponentFixture<TranslationTrainingQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TranslationTrainingQuestionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslationTrainingQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
