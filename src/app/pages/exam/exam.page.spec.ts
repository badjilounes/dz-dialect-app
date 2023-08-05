import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamPage } from './exam.page';

describe('ExamComponent', () => {
  let component: ExamPage;
  let fixture: ComponentFixture<ExamPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExamPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ExamPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
