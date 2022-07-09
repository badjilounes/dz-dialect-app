import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationTrainingProgressComponent } from './translation-training-progress.component';

describe('TranslationTrainingProgressComponent', () => {
  let component: TranslationTrainingProgressComponent;
  let fixture: ComponentFixture<TranslationTrainingProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TranslationTrainingProgressComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslationTrainingProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
