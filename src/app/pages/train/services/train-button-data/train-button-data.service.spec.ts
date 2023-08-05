import { TestBed } from '@angular/core/testing';

import { TrainButtonDataService } from './train-button-data.service';

describe('TrainingButtonService', () => {
  let service: TrainButtonDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainButtonDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
