import { TestBed } from '@angular/core/testing';

import { BuyMeACoffeeService } from './buy-me-a-coffee.service';

describe('BuyMeACoffeeService', () => {
  let service: BuyMeACoffeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuyMeACoffeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
