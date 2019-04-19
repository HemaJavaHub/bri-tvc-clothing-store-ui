import { TestBed } from '@angular/core/testing';

import { EcommerceServiceService } from './ecommerce-service.service';

describe('EcommerceServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EcommerceServiceService = TestBed.get(EcommerceServiceService);
    expect(service).toBeTruthy();
  });
});
