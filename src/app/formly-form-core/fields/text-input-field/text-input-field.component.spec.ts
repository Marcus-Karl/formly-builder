import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextInputComponentField } from './text-input-field.component';

describe('TextInputComponent', () => {
  let component: TextInputComponentField;
  let fixture: ComponentFixture<TextInputComponentField>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextInputComponentField ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextInputComponentField);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
