import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Splits } from './splits';

describe('Splits', () => {
  let component: Splits;
  let fixture: ComponentFixture<Splits>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Splits],
    }).compileComponents();

    fixture = TestBed.createComponent(Splits);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
