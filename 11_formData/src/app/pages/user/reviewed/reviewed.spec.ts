import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Reviewed } from './reviewed';

describe('Reviewed', () => {
  let component: Reviewed;
  let fixture: ComponentFixture<Reviewed>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Reviewed],
    }).compileComponents();

    fixture = TestBed.createComponent(Reviewed);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
