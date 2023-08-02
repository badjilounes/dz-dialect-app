import { TestBed } from '@angular/core/testing';

import { TrainingButtonConfigurationService } from './training-button-configuration.service';

describe('TrainingButtonService', () => {
  let service: TrainingButtonConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainingButtonConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
