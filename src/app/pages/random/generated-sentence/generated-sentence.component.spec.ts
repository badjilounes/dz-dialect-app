import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratedSentenceComponent } from './generated-sentence.component';

describe('GeneratedSentenceComponent', () => {
  let component: GeneratedSentenceComponent;
  let fixture: ComponentFixture<GeneratedSentenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneratedSentenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratedSentenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
