import { TestBed } from '@angular/core/testing';

import { ApiBrandsService } from './api-brands.service';
import 'jasmine';

describe('ApiBrandsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiBrandsService = TestBed.get(ApiBrandsService);
    expect(service).toBeTruthy();
  });
});
