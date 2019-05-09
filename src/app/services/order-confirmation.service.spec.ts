import { TestBed } from '@angular/core/testing';

import { OrderConfirmationService } from './order-confirmation.service';

describe('OrderConfirmationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrderConfirmationService = TestBed.get(OrderConfirmationService);
    expect(service).toBeTruthy();
  });
});
