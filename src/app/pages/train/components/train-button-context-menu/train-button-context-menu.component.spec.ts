import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainButtonContextMenuComponent } from './train-button-context-menu.component';

describe('TrainButtonContextMenuComponent', () => {
  let component: TrainButtonContextMenuComponent;
  let fixture: ComponentFixture<TrainButtonContextMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainButtonContextMenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TrainButtonContextMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
