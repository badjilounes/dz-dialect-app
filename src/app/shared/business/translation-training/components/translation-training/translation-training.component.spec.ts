import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationTrainingComponent } from './translation-training.component';

describe('TranslationTrainingComponent', () => {
  let component: TranslationTrainingComponent;
  let fixture: ComponentFixture<TranslationTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TranslationTrainingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TranslationTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
