import { Component } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FieldType } from '@ngx-formly/material';

@Component({
  selector: 'text-input-field',
  templateUrl: './text-input-field.component.html',
  styleUrls: ['./text-input-field.component.scss']
})
export class TextInputComponentField extends FieldType<FormlyFieldConfig> {

}
