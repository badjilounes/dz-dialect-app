import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileInformationComponent } from './user-profile-information.component';

describe('UserProfileInformationComponent', () => {
  let component: UserProfileInformationComponent;
  let fixture: ComponentFixture<UserProfileInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProfileInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProfileInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
