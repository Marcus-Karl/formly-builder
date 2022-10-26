import { FormlyExtension, FormlyFieldConfig } from '@ngx-formly/core';

export class GenericSetupExtension implements FormlyExtension {

  constructor() { }

  prePopulate(field: FormlyFieldConfig) {
    if (field.props === undefined || field.props === null) {
      field.props = {};
    }

    if (Array.isArray(field.props.options) && !Array.isArray(field.props['_options'])) {
      field.props['_options'] = field.props.options;
    }
  }

  onPopulate(field: FormlyFieldConfig) {
    if (field.fieldGroup?.find(x => x.props && !!x.props['_order'])) {
      field.fieldGroup.sort(this.sortFieldGroup);
    }
  }

  private sortFieldGroup(left: FormlyFieldConfig, right: FormlyFieldConfig) {
    return Number(left.props && left.props['_order'] || 99999) - Number(right.props && right.props['_order'] || 99999);
  }
}
