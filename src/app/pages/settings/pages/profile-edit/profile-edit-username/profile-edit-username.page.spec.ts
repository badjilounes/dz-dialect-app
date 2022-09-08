import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEditUsernamePage } from './profile-edit-username.page';

describe('ProfileEditUsernamePage', () => {
  let component: ProfileEditUsernamePage;
  let fixture: ComponentFixture<ProfileEditUsernamePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileEditUsernamePage],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileEditUsernamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
