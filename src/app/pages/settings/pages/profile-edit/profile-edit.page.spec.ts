import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEditPage } from './profile-edit.page';

describe('ProfileEditComponent', () => {
  let component: ProfileEditPage;
  let fixture: ComponentFixture<ProfileEditPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileEditPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
