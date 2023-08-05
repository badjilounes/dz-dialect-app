import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainCourseSectionComponent } from './train-course-section.component';

describe('TrainCourseSectionComponent', () => {
  let component: TrainCourseSectionComponent;
  let fixture: ComponentFixture<TrainCourseSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainCourseSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainCourseSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
