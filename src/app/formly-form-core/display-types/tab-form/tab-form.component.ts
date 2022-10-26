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
    if (field.props) {
      if (field.props.linear === undefined || field.props.linear === null) {
        field.props['linear'] = true;
      }
    }
  }
}
