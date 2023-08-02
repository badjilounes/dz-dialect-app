import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainButtonComponent } from './train-button.component';

describe('TrainButtonComponent', () => {
  let component: TrainButtonComponent;
  let fixture: ComponentFixture<TrainButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TrainButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
