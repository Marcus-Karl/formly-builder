import { Component } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { AbstractBaseFormControlsComponent } from '../base-form-controls';

@Component({
  selector: 'tab-form',
  templateUrl: './tab-form.component.html',
  styleUrls: ['./tab-form.component.scss']
})
export class TabFormComponent extends AbstractBaseFormControlsComponent {
  postPopulate(field: FormlyFieldConfig) {
    if (field.templateOptions) {
      if (field.templateOptions.linear === undefined || field.templateOptions.linear === null) {
        field.templateOptions['linear'] = true;
      }
    }
  }
}
