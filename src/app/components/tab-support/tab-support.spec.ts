import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabSupport } from './tab-support';

describe('TabSupport', () => {
  let component: TabSupport;
  let fixture: ComponentFixture<TabSupport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabSupport],
    }).compileComponents();

    fixture = TestBed.createComponent(TabSupport);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
