import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationTrainingBottomSheetResultComponent } from './translation-training-bottom-sheet-result.component';

describe('TestBottomSheetResultComponent', () => {
  let component: TranslationTrainingBottomSheetResultComponent;
  let fixture: ComponentFixture<TranslationTrainingBottomSheetResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TranslationTrainingBottomSheetResultComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslationTrainingBottomSheetResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
