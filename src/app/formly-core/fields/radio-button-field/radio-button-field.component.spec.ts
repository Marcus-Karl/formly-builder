import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioButtonFieldComponent } from './radio-button-field.component';

describe('RadioButtonFieldComponent', () => {
  let component: RadioButtonFieldComponent;
  let fixture: ComponentFixture<RadioButtonFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadioButtonFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioButtonFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
