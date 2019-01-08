import { TestBed } from '@angular/core/testing';

import { RequestToBackendService } from './request-to-backend.service';

describe('RequestToBackendService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RequestToBackendService = TestBed.get(RequestToBackendService);
    expect(service).toBeTruthy();
  });
});
