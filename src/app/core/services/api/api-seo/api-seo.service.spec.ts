import { TestBed } from '@angular/core/testing';

import { ApiSeoService } from './api-seo.service';

describe('ApiSeoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiSeoService = TestBed.get(ApiSeoService);
    expect(service).toBeTruthy();
  });
});
