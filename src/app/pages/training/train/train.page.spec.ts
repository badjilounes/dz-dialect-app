import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainPage } from './train.page';

describe('TrainingHomeComponent', () => {
  let component: TrainPage;
  let fixture: ComponentFixture<TrainPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainPage],
    }).compileComponents();

    fixture = TestBed.createComponent(TrainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
