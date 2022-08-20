import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullLineCardButtonComponent } from './full-line-card-button.component';

describe('FullLineCardButtonComponent', () => {
  let component: FullLineCardButtonComponent;
  let fixture: ComponentFixture<FullLineCardButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullLineCardButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullLineCardButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
