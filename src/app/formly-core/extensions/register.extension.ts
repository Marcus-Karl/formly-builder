import { ValidationErrors } from '@angular/forms';
import { ConfigOption, FormlyFieldConfig } from '@ngx-formly/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import { DateTimeService } from '../services/date-time.service';

import { BusinessRulesSetupExtension } from './business-rules.extention';
import { GenericSetupExtension } from './generic-setup.extention';
import { TokenExtension } from './token.extension';
import { TranslateExtension } from './translation.extension';
import { ValidationExtension } from './validation.extension';

export const registerExtensions = (dateTimeService: DateTimeService, translate: TranslateService) => {

  let extenstionConfig: ConfigOption = {
    validationMessages: ValidationExtension.getValidationMessages(translate),
    extensions: [
      {
        name: 'generic-setup',
        extension: new GenericSetupExtension()
      },
      {
        name: 'validations',
        extension: new ValidationExtension()
      },
      {
        name: 'tokens',
        extension: new TokenExtension(dateTimeService)
      },
      {
        name: 'business-rules-setup',
        extension: new BusinessRulesSetupExtension()
      },
      {
        name: 'translate-extension',
        extension: new TranslateExtension(translate)
      }
    ],
  };

  return extenstionConfig;
}
