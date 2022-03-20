import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BuyMeACoffeeButtonComponent } from './buy-me-a-coffee-button.component';

describe('BuyMeACoffeeComponent', () => {
  let component: BuyMeACoffeeButtonComponent;
  let fixture: ComponentFixture<BuyMeACoffeeButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuyMeACoffeeButtonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyMeACoffeeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
