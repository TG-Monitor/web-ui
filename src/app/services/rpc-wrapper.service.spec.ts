import { TestBed } from '@angular/core/testing';

import { RpcWrapperService } from './rpc-wrapper.service';

describe('RpcWrapperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RpcWrapperService = TestBed.get(RpcWrapperService);
    expect(service).toBeTruthy();
  });
});
