import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeywordPage } from './keyword.page';

describe('KeywordPage', () => {
  let component: KeywordPage;
  let fixture: ComponentFixture<KeywordPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KeywordPage],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeywordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
