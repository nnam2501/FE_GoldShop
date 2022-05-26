import { TestBed } from '@angular/core/testing';

import { ApiExchangeRateService } from './api-exchange-rate.service';

describe('ApiExchangeRateService', () => {
  let service: ApiExchangeRateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiExchangeRateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
