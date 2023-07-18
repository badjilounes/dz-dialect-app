import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileToolbarComponent } from './user-profile-toolbar.component';

describe('UserProfileToolbarComponent', () => {
  let component: UserProfileToolbarComponent;
  let fixture: ComponentFixture<UserProfileToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserProfileToolbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserProfileToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
