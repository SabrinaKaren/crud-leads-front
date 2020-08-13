import { TestBed } from '@angular/core/testing';

import { CanActivateLoginService } from './can-activate-login.service';

describe('CanActivateLoginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CanActivateLoginService = TestBed.get(CanActivateLoginService);
    expect(service).toBeTruthy();
  });
});
