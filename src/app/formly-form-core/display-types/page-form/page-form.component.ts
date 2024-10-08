import { Component } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { AbstractBaseFormControlsComponent } from '../base-form-controls';

@Component({
  selector: 'page-form',
  templateUrl: './page-form.component.html',
  styleUrls: ['./page-form.component.scss']
})
export class PageFormComponent extends AbstractBaseFormControlsComponent {

  postPopulate(field: FormlyFieldConfig) {
    if (field.props) {
      if (field.props.linear === undefined || field.props.linear === null) {
        field.props['linear'] = true;
      }
    }
  }

  getPrecedingPageNamesInError(index: number): string {
    const formsInError = [];

    if (this.field.fieldGroup?.length) {
      for (let i = 0; i < index; i++) {
        if (this.isPageAtIndexInvalid(index, true, true)) {
          formsInError.push(this.field.fieldGroup[i].props?.label);
        }
      }
    }

    return formsInError.filter(x => x?.trim().length).join('\n');
  }

  getSubsequentPageNamesInError(index: number): string {
    const formsInError = [];

    if (this.field.fieldGroup?.length) {
      for (let i = index; i < this.field.fieldGroup?.length; i++) {
        if (this.isPageAtIndexInvalid(index, true, true)) {
          formsInError.push(this.field.fieldGroup[i].props?.label);
        }
      }
    }

    return formsInError.filter(x => x?.trim().length).join('\n');
  }

  getPreviousPageName(index: number): string {
    if (this.field.fieldGroup) {
      for (let i = index - 1; i >= 0; i--) {
        if (!this.field.fieldGroup[i].hide) {
          return this.field.fieldGroup[i].props?.label ?? '';
        }
      }
    }

    return '';
  }

  getNextPageName(index: number): string {
    if (this.field.fieldGroup) {
      for (let i = index + 1; i < this.field.fieldGroup.length; i++) {
        if (!this.field.fieldGroup[i].hide) {
          return this.field.fieldGroup[i].props?.label ?? '';
        }
      } 
    }

    return '';
  }
}
