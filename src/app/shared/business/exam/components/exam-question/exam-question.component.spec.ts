import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamQuestionComponent } from './exam-question.component';

describe('ExamQuestionComponent', () => {
  let component: ExamQuestionComponent;
  let fixture: ComponentFixture<ExamQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamQuestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
