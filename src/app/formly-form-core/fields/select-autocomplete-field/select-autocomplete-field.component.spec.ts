import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAutoCompleteFieldComponent } from './select-autocomplete-field.component';

describe('SelectAutoCompleteFieldComponent', () => {
  let component: SelectAutoCompleteFieldComponent;
  let fixture: ComponentFixture<SelectAutoCompleteFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectAutoCompleteFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectAutoCompleteFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
