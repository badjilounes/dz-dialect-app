import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingToolbarLinksComponent } from './training-toolbar-links.component';

describe('TrainingToolbarLinksComponent', () => {
  let component: TrainingToolbarLinksComponent;
  let fixture: ComponentFixture<TrainingToolbarLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingToolbarLinksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingToolbarLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
