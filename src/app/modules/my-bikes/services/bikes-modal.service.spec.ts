import { TestBed } from '@angular/core/testing';

import { BikesModalService } from './bikes-modal.service';

describe('BikesModal.ServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BikesModalService = TestBed.get(BikesModalService);
    expect(service).toBeTruthy();
  });
});
