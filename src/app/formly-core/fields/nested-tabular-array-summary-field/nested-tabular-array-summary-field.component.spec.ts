import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NestedTabularArraySummaryFieldComponent } from './nested-tabular-array-summary-field.component';

describe('NestedTabularArraySummaryFieldComponent', () => {
  let component: NestedTabularArraySummaryFieldComponent;
  let fixture: ComponentFixture<NestedTabularArraySummaryFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NestedTabularArraySummaryFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NestedTabularArraySummaryFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
