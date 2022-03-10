import { Component, OnInit } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';
import { BuilderFormState, SelectionOptionType } from '../../models/builder-form-state';

@Component({
  selector: 'app-field-category-selection-options',
  template: `<ng-container #fieldComponent></ng-container>`,
})
export class FieldCategorySelectionOptionsComponent extends FieldWrapper implements OnInit {

  ngOnInit() {
    this.setOptions();
  }

  setOptions() {
    if (this.to._options?.length) {
      return;
    }

    let builderFormState: BuilderFormState = this.options?.formState;

    if (!builderFormState) {
      console.error(`Builder formstate is undefined: ${builderFormState}`);
      return;
    }

    let options = builderFormState.builder.options[SelectionOptionType.FieldCategory];

    this.to.options = options;
    this.to._options = options;
  }
}
