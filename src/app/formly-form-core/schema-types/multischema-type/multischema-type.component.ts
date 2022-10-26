import { Component } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FieldType } from '@ngx-formly/material';

@Component({
  selector: 'app-multischema-type',
  template: `<formly-field *ngFor="let f of field.fieldGroup" [field]="f" [class]="field.fieldGroupClassName"></formly-field>`,
  styles: [
    `:host {
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 100%;
    }`
  ]
})
export class MultischemaTypeComponent extends FieldType<FormlyFieldConfig> {

}