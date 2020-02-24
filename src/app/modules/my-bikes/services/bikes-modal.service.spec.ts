import { TestBed } from '@angular/core/testing';

import { BikesModal.ServiceService } from './bikes-modal.service.service';

describe('BikesModal.ServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BikesModal.ServiceService = TestBed.get(BikesModal.ServiceService);
    expect(service).toBeTruthy();
  });
});
