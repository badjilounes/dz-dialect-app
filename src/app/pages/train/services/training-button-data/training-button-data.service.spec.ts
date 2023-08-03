import { TestBed } from '@angular/core/testing';

import { TrainingButtonDataService } from './training-button-data.service';

describe('TrainingButtonService', () => {
  let service: TrainingButtonDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainingButtonDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
