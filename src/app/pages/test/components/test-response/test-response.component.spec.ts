import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestResponseComponent } from './test-response.component';

describe('TestResponseComponent', () => {
  let component: TestResponseComponent;
  let fixture: ComponentFixture<TestResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestResponseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
