import { TestBed } from '@angular/core/testing';

import { Count } from './count';

describe('Count', () => {
  let service: Count;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Count);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
