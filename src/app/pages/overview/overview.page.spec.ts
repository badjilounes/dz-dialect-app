import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewPage } from './overview.page';

describe('OverviewComponent', () => {
  let component: OverviewPage;
  let fixture: ComponentFixture<OverviewPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewPage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
