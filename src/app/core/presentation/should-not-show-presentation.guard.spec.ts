import { TestBed } from '@angular/core/testing';

import { ShouldNotShowPresentationGuard } from './should-not-show-presentation.guard';

describe('ShouldNotShowPresentationGuard', () => {
  let guard: ShouldNotShowPresentationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ShouldNotShowPresentationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
