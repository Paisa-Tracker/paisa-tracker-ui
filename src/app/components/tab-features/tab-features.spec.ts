import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabFeatures } from './tab-features';

describe('TabFeatures', () => {
  let component: TabFeatures;
  let fixture: ComponentFixture<TabFeatures>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabFeatures],
    }).compileComponents();

    fixture = TestBed.createComponent(TabFeatures);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
