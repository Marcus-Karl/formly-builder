import { Component } from '@angular/core';
import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'object-type',
  templateUrl: './object-type.component.html',
  styleUrls: ['./object-type.component.scss']
})
export class ObjectTypeComponent extends FieldType<FormlyFieldConfig> {

}
