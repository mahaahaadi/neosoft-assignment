import { TestBed } from '@angular/core/testing';

import { HodGuard } from './hod.guard';

describe('HodGuard', () => {
  let guard: HodGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HodGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
