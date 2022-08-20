import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSuccessComponent } from './profile-success.component';

describe('ProfileStatisticsComponent', () => {
  let component: ProfileSuccessComponent;
  let fixture: ComponentFixture<ProfileSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileSuccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
