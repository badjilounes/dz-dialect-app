import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratedKeywordComponent } from './generated-keyword.component';

describe('GeneratedKeywordComponent', () => {
  let component: GeneratedKeywordComponent;
  let fixture: ComponentFixture<GeneratedKeywordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneratedKeywordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratedKeywordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
