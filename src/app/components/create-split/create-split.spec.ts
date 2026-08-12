import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSplit } from './create-split';

describe('CreateSplit', () => {
  let component: CreateSplit;
  let fixture: ComponentFixture<CreateSplit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSplit],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateSplit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
