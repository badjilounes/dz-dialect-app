import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationHeaderComponent } from './translation-header.component';

describe('TranslationHeaderComponent', () => {
  let component: TranslationHeaderComponent;
  let fixture: ComponentFixture<TranslationHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TranslationHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslationHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
