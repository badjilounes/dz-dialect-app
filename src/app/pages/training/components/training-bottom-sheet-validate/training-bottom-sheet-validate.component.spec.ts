import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrainingBottomSheetValidateComponent } from './training-bottom-sheet-validate.component';

describe('TrainingBottomSheetValidateComponent', () => {
  let component: TrainingBottomSheetValidateComponent;
  let fixture: ComponentFixture<TrainingBottomSheetValidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainingBottomSheetValidateComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingBottomSheetValidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
