import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslationTrainingBottomSheetValidateComponent } from './translation-training-bottom-sheet-validate.component';

describe('TranslationTrainingBottomSheetValidateComponent', () => {
  let component: TranslationTrainingBottomSheetValidateComponent;
  let fixture: ComponentFixture<TranslationTrainingBottomSheetValidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TranslationTrainingBottomSheetValidateComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslationTrainingBottomSheetValidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
