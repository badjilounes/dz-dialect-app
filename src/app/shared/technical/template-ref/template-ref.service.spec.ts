import { TestBed } from '@angular/core/testing';

import { TemplateRefService } from './template-ref.service';

describe('TemplateRefService', () => {
  let service: TemplateRefService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemplateRefService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
