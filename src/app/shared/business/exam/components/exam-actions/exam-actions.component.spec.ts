import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamActionsComponent } from './exam-actions.component';

describe('ExamActionsComponent', () => {
  let component: ExamActionsComponent;
  let fixture: ComponentFixture<ExamActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamActionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
