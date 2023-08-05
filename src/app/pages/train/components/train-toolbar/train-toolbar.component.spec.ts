import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainToolbarComponent } from './train-toolbar.component';

describe('TrainToolbarComponent', () => {
  let component: TrainToolbarComponent;
  let fixture: ComponentFixture<TrainToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainToolbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
