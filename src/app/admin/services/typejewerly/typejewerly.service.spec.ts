import { TestBed } from '@angular/core/testing';

import { TypejewerlyService } from './typejewerly.service';

describe('TypejewerlyService', () => {
  let service: TypejewerlyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypejewerlyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
