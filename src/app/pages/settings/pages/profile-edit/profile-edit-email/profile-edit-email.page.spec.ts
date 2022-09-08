import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEditEmailPage } from './profile-edit-email.page';

describe('ProfileEditNameComponent', () => {
  let component: ProfileEditEmailPage;
  let fixture: ComponentFixture<ProfileEditEmailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileEditEmailPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileEditEmailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
