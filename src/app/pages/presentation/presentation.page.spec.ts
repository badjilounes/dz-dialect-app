import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentationPage } from './presentation.page';

describe('PresentationPage', () => {
  let component: PresentationPage;
  let fixture: ComponentFixture<PresentationPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresentationPage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PresentationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
