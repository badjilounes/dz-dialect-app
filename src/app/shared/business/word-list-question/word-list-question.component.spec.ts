import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordListQuestionComponent } from './word-list-question.component';

describe('WordListQuestionComponent', () => {
  let component: WordListQuestionComponent;
  let fixture: ComponentFixture<WordListQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordListQuestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordListQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
