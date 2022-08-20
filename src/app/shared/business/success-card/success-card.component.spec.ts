import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessCardComponent } from './success-card.component';

describe('SuccessCardComponent', () => {
  let component: SuccessCardComponent;
  let fixture: ComponentFixture<SuccessCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
