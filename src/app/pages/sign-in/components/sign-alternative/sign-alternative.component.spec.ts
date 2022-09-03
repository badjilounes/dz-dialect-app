import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignAlternativeComponent } from './sign-alternative.component';

describe('SignAlternativeComponent', () => {
  let component: SignAlternativeComponent;
  let fixture: ComponentFixture<SignAlternativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignAlternativeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignAlternativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
