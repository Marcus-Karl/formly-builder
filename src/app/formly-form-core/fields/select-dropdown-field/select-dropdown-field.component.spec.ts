import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectDropDownFieldComponent } from './select-dropdown-field.component';

describe('SelectDropDownFieldComponent', () => {
  let component: SelectDropDownFieldComponent;
  let fixture: ComponentFixture<SelectDropDownFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectDropDownFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectDropDownFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
