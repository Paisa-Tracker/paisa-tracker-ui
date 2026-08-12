import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabPricing } from './tab-pricing';

describe('TabPricing', () => {
  let component: TabPricing;
  let fixture: ComponentFixture<TabPricing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabPricing],
    }).compileComponents();

    fixture = TestBed.createComponent(TabPricing);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
