import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomPage } from './random.page';

describe('RandomPage', () => {
  let component: RandomPage;
  let fixture: ComponentFixture<RandomPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RandomPage],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
