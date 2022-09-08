import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEditNamePage } from './profile-edit-name.page';

describe('ProfileEditNameComponent', () => {
  let component: ProfileEditNamePage;
  let fixture: ComponentFixture<ProfileEditNamePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileEditNamePage],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileEditNamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
