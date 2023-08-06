import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainButtonTooltipComponent } from './train-button-tooltip.component';

describe('TrainButtonTooltipComponent', () => {
  let component: TrainButtonTooltipComponent;
  let fixture: ComponentFixture<TrainButtonTooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainButtonTooltipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainButtonTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
