import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeywordComponent } from './keyword.page';

describe('KeywordComponent', () => {
  let component: KeywordComponent;
  let fixture: ComponentFixture<KeywordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KeywordComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeywordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
