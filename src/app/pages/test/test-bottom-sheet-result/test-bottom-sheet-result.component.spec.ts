import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestBottomSheetResultComponent } from './test-bottom-sheet-result.component';

describe('TestBottomSheetResultComponent', () => {
  let component: TestBottomSheetResultComponent;
  let fixture: ComponentFixture<TestBottomSheetResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestBottomSheetResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestBottomSheetResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
