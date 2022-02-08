import { FormlyExtension, FormlyFieldConfig } from '@ngx-formly/core';

export class ChangeDetectionExtension implements FormlyExtension {

  constructor() { }

  prePopulate(field: FormlyFieldConfig) {
    if (field.options?.formState?.changeMap) {

    }
  }

  onPopulate(field: FormlyFieldConfig) {
    
  }

  postPopulate(field: FormlyFieldConfig) {

  }
}
