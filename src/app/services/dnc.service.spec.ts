import { TestBed } from '@angular/core/testing';

import { DncService } from './dnc.service';

describe('DncService', () => {
  let service: DncService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DncService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
