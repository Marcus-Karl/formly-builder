import { Component } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FieldType } from '@ngx-formly/material';

@Component({
  selector: 'textbox-field',
  templateUrl: './textbox-field.component.html',
  styleUrls: ['./textbox-field.component.scss']
})
export class TextBoxFieldComponent extends FieldType<FormlyFieldConfig> {

}
