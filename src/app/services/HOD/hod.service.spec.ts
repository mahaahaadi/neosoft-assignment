import { TestBed } from '@angular/core/testing';

import { HODService } from './hod.service';

describe('HODService', () => {
  let service: HODService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HODService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
