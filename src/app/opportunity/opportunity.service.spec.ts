import { TestBed } from '@angular/core/testing';

import { OpportunityService } from './opportunity.service';

describe('OpportunityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OpportunityService = TestBed.get(OpportunityService);
    expect(service).toBeTruthy();
  });
});
