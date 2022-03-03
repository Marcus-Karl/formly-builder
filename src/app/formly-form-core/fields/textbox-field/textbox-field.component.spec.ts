import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextBoxFieldComponent } from './textbox-field.component';

describe('TextBoxFieldComponent', () => {
  let component: TextBoxFieldComponent;
  let fixture: ComponentFixture<TextBoxFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextBoxFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextBoxFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
