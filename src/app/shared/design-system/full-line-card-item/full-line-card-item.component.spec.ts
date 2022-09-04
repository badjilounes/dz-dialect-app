import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullLineCardItemComponent } from './full-line-card-item.component';

describe('SuccessCardComponent', () => {
  let component: FullLineCardItemComponent;
  let fixture: ComponentFixture<FullLineCardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FullLineCardItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FullLineCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
