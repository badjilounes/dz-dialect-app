import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestBottomSheetComponent } from './test-bottom-sheet.component';

describe('TestBottomSheetComponent', () => {
  let component: TestBottomSheetComponent;
  let fixture: ComponentFixture<TestBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestBottomSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
