import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestBottomSheetValidateComponent } from './test-bottom-sheet-validate.component';

describe('TestBottomSheetComponent', () => {
  let component: TestBottomSheetValidateComponent;
  let fixture: ComponentFixture<TestBottomSheetValidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestBottomSheetValidateComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestBottomSheetValidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
