import { TestBed } from '@angular/core/testing';

import { CajaService } from './caja.service';

describe('CajaService', () => {
  let service: CajaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CajaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
