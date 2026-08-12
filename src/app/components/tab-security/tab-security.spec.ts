import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabSecurity } from './tab-security';

describe('TabSecurity', () => {
  let component: TabSecurity;
  let fixture: ComponentFixture<TabSecurity>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabSecurity],
    }).compileComponents();

    fixture = TestBed.createComponent(TabSecurity);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
