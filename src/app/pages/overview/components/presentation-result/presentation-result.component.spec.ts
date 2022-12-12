import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentationResultComponent } from './presentation-result.component';

describe('PresentationResultComponent', () => {
  let component: PresentationResultComponent;
  let fixture: ComponentFixture<PresentationResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresentationResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PresentationResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
