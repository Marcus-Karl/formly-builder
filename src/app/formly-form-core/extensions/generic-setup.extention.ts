import { FormlyExtension, FormlyFieldConfig } from '@ngx-formly/core';

export class GenericSetupExtension implements FormlyExtension {

  constructor() { }

  prePopulate(field: FormlyFieldConfig) {
    if (field.templateOptions === undefined || field.templateOptions === null) {
      field.templateOptions = {};
    }

    if (Array.isArray(field.templateOptions.options) && !Array.isArray(field.templateOptions['_options'])) {
      field.templateOptions['_options'] = field.templateOptions.options;
    }
  }

  onPopulate(field: FormlyFieldConfig) {
    if (field.fieldGroup?.find(x => x.templateOptions && !!x.templateOptions['_order'])) {
      field.fieldGroup.sort(this.sortFieldGroup);
    }
  }

  private sortFieldGroup(left: FormlyFieldConfig, right: FormlyFieldConfig) {
    return Number(left.templateOptions && left.templateOptions['_order'] || 99999) - Number(right.templateOptions && right.templateOptions['_order'] || 99999);
  }
}
