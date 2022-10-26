import { Validators } from '@angular/forms';
import { ConfigOption, FormlyConfig } from '@ngx-formly/core';

import { GenericSetupExtension } from './generic-setup.extention';

export const registerExtensions = (formlyConfig: FormlyConfig) => {

  const extenstionConfig: ConfigOption = {
    extensions: [
      {
        name: 'generic-setup',
        extension: new GenericSetupExtension()
      }
    ],
    validators: [
      { name: 'required', validation: Validators.required }
    ],
    validationMessages: [
      { name: 'required', message: (err, field) => `${field.templateOptions?.label} is required` }
    ]
  };

  return extenstionConfig;
};
