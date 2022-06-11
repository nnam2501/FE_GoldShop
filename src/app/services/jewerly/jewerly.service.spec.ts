import { TestBed } from '@angular/core/testing';

import { JewerlyService } from './jewerly.service';

describe('JewerlyService', () => {
  let service: JewerlyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JewerlyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
