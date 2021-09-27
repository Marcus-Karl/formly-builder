import { Component } from '@angular/core';
import { AbstractBaseFormControlsComponent } from '../base-form-controls';

@Component({
  selector: 'page-form',
  templateUrl: './page-form.component.html',
  styleUrls: ['./page-form.component.scss']
})
export class PageFormComponent extends AbstractBaseFormControlsComponent {

  getPrecedingPageNamesInError(index: number) {
    let formsInError = '\n';

    for (let i = 0; i < index; i++) {
      if (this.field.fieldGroup && this.field.fieldGroup[i].formControl?.invalid) {
        formsInError += this.field.fieldGroup[i].templateOptions?.label + '\n';
      }
    }

    formsInError = formsInError.replace(/\n$/g, '');

    return formsInError;
  }

  getSubsequentPageNamesInError(index: number) {
    let formsInError = '\n';

    if (this.field.fieldGroup?.length) {
      for (let i = index; i < this.field.fieldGroup?.length; i++) {
        if (this.field.fieldGroup && this.field.fieldGroup[i].formControl?.invalid) {
          formsInError += this.field.fieldGroup[i].templateOptions?.label + '\n';
        }
      }
    }

    formsInError = formsInError.replace(/\n$/g, '');

    return formsInError;
  }

  getPreviousPageName(index: number) {
    if (this.field.fieldGroup) {
      for (let i = index - 1; i >= 0; i--) {
        if (!this.field.fieldGroup[i].hide) {
          return this.field.fieldGroup[i].templateOptions?.label;
        }
      }
    }

    return '';
  }

  getNextPageName(index: number) {
    if (this.field.fieldGroup) {
      for (let i = index + 1; i < this.field.fieldGroup.length; i++) {
        if (!this.field.fieldGroup[i].hide) {
          return this.field.fieldGroup[i].templateOptions?.label;
        }
      } 
    }

    return '';
  }
}
