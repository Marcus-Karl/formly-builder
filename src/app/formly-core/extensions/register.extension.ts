import { ValidationErrors } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { TranslateService } from '@ngx-translate/core';

import { DateTimeService } from '../services/date-time.service';

import { BusinessRulesSetupExtension } from './business-rules.extention';
import { GenericSetupExtension } from './generic-setup.extention';
import { TokenExtension } from './token.extension';
import { ValidationExtension } from './validation.extension';

export const registerExtensions = (dateTimeService: DateTimeService, translate: TranslateService) => {

  let extenstionConfig = {
    validationMessages: [
      {
        name: 'required',
        message: () => translate.instant('This field is required.')
      },
      {
        name: 'business-rules',
        message: (errors: ValidationErrors, field: FormlyFieldConfig) => {
          if (errors) {
            return Object.values(errors);
          }

          return null;
        }
      }
    ],
    extensions: [
      {
        name: 'generic-setup',
        extension: new GenericSetupExtension()
      },
      {
        name: 'validations',
        extension: new ValidationExtension(translate)
      },
      {
        name: 'tokens',
        extension: new TokenExtension(dateTimeService)
      },
      {
        name: 'business-rules-setup',
        extension: new BusinessRulesSetupExtension()
      }
    ],
  };

  return extenstionConfig;
}
