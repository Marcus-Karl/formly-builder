import { Component } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { AbstractBaseFormControlsComponent } from '../base-form-controls';

@Component({
  selector: 'vertical-stepper-form',
  templateUrl: './vertical-stepper-form.component.html',
  styleUrls: ['./vertical-stepper-form.component.scss']
})
export class VerticalStepperFormComponent extends AbstractBaseFormControlsComponent {

  get pageStates(): { [key: string]: { icon: string, class: string }} {
    return this.to.pageStates;
  }

  postPopulate(field: FormlyFieldConfig) {
    if (field.templateOptions) {
      if (field.templateOptions.linear === undefined || field.templateOptions.linear === null) {
        field.templateOptions['linear'] = true;
      }
    }
  }
}
