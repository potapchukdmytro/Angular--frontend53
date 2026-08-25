import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicBand } from './music-band';

describe('MusicBand', () => {
  let component: MusicBand;
  let fixture: ComponentFixture<MusicBand>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MusicBand],
    }).compileComponents();

    fixture = TestBed.createComponent(MusicBand);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
