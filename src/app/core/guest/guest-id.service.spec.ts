import { TestBed } from '@angular/core/testing';

import { GuestIdService } from './guest-id.service';

describe('GuestIdService', () => {
  let service: GuestIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuestIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
