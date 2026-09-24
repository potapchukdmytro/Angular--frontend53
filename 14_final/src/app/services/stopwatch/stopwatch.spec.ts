import { TestBed } from '@angular/core/testing';

import { Stopwatch } from './stopwatch';

describe('Stopwatch', () => {
  let service: Stopwatch;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Stopwatch);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
