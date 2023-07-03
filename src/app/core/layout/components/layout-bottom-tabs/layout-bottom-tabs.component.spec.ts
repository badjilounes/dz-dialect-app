import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutBottomTabsComponent } from './layout-bottom-tabs.component';

describe('LayoutBottomTabsComponent', () => {
  let component: LayoutBottomTabsComponent;
  let fixture: ComponentFixture<LayoutBottomTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutBottomTabsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutBottomTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
