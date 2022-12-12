import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamResponseComponent } from './exam-response.component';

describe('ExamResponseComponent', () => {
  let component: ExamResponseComponent;
  let fixture: ComponentFixture<ExamResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamResponseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
