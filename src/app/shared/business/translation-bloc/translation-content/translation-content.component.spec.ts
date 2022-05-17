import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationContentComponent } from './translation-content.component';

describe('TranslationContentComponent', () => {
  let component: TranslationContentComponent;
  let fixture: ComponentFixture<TranslationContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TranslationContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslationContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
