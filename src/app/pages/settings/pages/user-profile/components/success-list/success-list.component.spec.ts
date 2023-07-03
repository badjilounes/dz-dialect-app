import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessListComponent } from './success-list.component';

describe('SuccessListComponent', () => {
  let component: SuccessListComponent;
  let fixture: ComponentFixture<SuccessListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
