import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEditPictureComponent } from './profile-edit-picture.component';

describe('ProfilePictureUploadDialogComponent', () => {
  let component: ProfileEditPictureComponent;
  let fixture: ComponentFixture<ProfileEditPictureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileEditPictureComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileEditPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
