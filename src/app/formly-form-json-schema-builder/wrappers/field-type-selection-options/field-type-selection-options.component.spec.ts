import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldTypeSelectionOptionsComponent } from './field-type-selection-options.component';

describe('FieldTypeSelectionOptionsComponent', () => {
  let component: FieldTypeSelectionOptionsComponent;
  let fixture: ComponentFixture<FieldTypeSelectionOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldTypeSelectionOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldTypeSelectionOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
