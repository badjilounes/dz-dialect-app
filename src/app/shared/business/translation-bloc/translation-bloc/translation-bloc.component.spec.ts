import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslationBlocComponent } from './translation-bloc.component';

describe('GeneratedSentenceComponent', () => {
  let component: TranslationBlocComponent;
  let fixture: ComponentFixture<TranslationBlocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TranslationBlocComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslationBlocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
