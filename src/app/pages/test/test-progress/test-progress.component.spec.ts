import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestProgressComponent } from './test-progress.component';

describe('TestProgressComponent', () => {
  let component: TestProgressComponent;
  let fixture: ComponentFixture<TestProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestProgressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
