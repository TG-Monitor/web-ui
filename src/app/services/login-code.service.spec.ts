import { TestBed } from '@angular/core/testing';

import { LoginCodeService } from './login-code.service';

describe('LoginCodeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginCodeService = TestBed.get(LoginCodeService);
    expect(service).toBeTruthy();
  });
});
