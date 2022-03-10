import { Component } from '@angular/core';
import { FieldWrapper, FormlyFieldConfig } from '@ngx-formly/core';
import { BuilderFormState, SelectionOptionType } from '../../models/builder-form-state';

@Component({
  selector: 'app-form-selection-options',
  template: `<ng-container #fieldComponent></ng-container>`,
})
export class FormSelectionOptionsComponent extends FieldWrapper {

  onPopulate(field: FormlyFieldConfig) {
    let builderFormState: BuilderFormState = field.options?.formState;

    if (!builderFormState) {
      console.error(`Builder formstate is undefined: ${builderFormState}`);
      return;
    }

    if (!field.templateOptions) {
      field.templateOptions = {};
    }

    let options = builderFormState.builder.options[SelectionOptionType.Form];

    field.templateOptions.options = options;
    field.templateOptions._options = options;
  }
}
