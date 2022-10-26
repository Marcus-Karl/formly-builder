import { Component } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { FieldType } from '@ngx-formly/material';

@Component({
  selector: 'textbox-field',
  templateUrl: './textbox-field.component.html',
  styleUrls: ['./textbox-field.component.scss']
})
export class TextBoxFieldComponent extends FieldType {
  public formControl!: UntypedFormControl;
}
