

import { AbstractControl } from '@angular/forms';
import { FormlyFieldConfig, FormlyTemplateOptions } from '@ngx-formly/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

export class ValidationExtension {
  constructor() {}

  prePopulate(field: FormlyFieldConfig) {
    const to = field.templateOptions || {};

    if (!to._configuredValidators) {
      if (!field.validators) {
        field.validators = {};
      }

      this.configureValidation(to, field);

      to._configuredValidators = true;
    }
  }

  configureValidation(to: FormlyTemplateOptions, field: FormlyFieldConfig) {
    this.configureCustomValidators(to, field);

    this.configureDefaultValidators(field);
  }

  configureCustomValidators(to: FormlyTemplateOptions, field: FormlyFieldConfig) {
    if (to.customValidations) {
      let customValidations = Object.entries(to.customValidations);

      customValidations.forEach(([key, entry]: [string, any]) => {
        if (entry.expression && entry.message) {
          try {
            let validation = {
              expression: Function('control', 'field',
                `
                'use strict';

                let formState = field.options?.formState || {};
                let mainModel = formState.mainModel || {};
                let token = formState.tokens || {};

                let model = field.model || {};
                let to = field.templateOptions || {};
                let value = field.formControl.value || '';

                return !(${entry.expression});
              `),
              message: Function('error', 'field',
                `
                'use strict';

                let formState = field.options?.formState || {};
                let mainModel = formState.mainModel || {};
                let token = formState.tokens || {};

                let model = field.model || {};
                let to = field.templateOptions || {};
                let value = field.formControl.value || '';

                return \`${entry.message}\`;
              `)
            };

            field.validators[key] = validation;
          } catch (e) {
            console.error(`Error configuring custom validator`, e);
          }
        }
      });
    }
  }

  configureDefaultValidators(field: FormlyFieldConfig) {
    if (Array.isArray(field.templateOptions?.defaultValidations)) {
      field.templateOptions?.defaultValidations.forEach((element: any) => {
        switch (element) {
          case 'minimumNumber':
            this.setupMinimumNumber(field);
            break;
          case 'maximumNumber':
            this.setupMaximumNumber(field);
            break;
          default:
            break;
        }
      });
    }
  }

  setupMinimumNumber(f: FormlyFieldConfig) {
    if (!f.validators.minimumNumber) {
      f.validators['minimumNumber'] = {
        expression: (control: AbstractControl, field: FormlyFieldConfig, options: { [id: string]: any } = {}) => (control.value >= field.templateOptions?.minimumNumber && !field.formControl?.pristine) || ((control.value || '') + '').length == 0,
        message: f.validation?.messages && f.validation?.messages['minimumNumber']
      };
    }
  }

  setupMaximumNumber(f: FormlyFieldConfig) {
    if (!f.validators.maximumNumber) {
      f.validators['maximumNumber'] = {
        expression: (control: AbstractControl, field: FormlyFieldConfig, options: { [id: string]: any } = {}) => (control.value <= field.templateOptions?.maximumNumber && !field.formControl?.pristine) || ((control.value || '') + '').length == 0,
        message: f.validation?.messages && f.validation?.messages['maximumNumber']
      };
    }
  }

  static getValidationMessages(translate: TranslateService) {
    return [
      {
        name: 'required',
        message: (error: any, field: FormlyFieldConfig) => translate.instant('FORMLY_CORE.VALIDATIONS.REQUIRED_FIELD')
      },
      {
        name: 'minimumNumber',
        message: (error: any, field: FormlyFieldConfig): Observable<string> => translate.instant(
          'FORMLY_CORE.VALIDATIONS.MINIMUM_NUMBER',
          { value: field.formControl?.value, minimumNumber: field.templateOptions?.minimumNumber }
        )
      },
      {
        name: 'maximumNumber',
        message: (error: any, field: FormlyFieldConfig): Observable<string> => translate.instant(
          'FORMLY_CORE.VALIDATIONS.MAXIMUM_NUMBER',
          { value: field.formControl?.value, maximumNumber: field.templateOptions?.maximumNumber }
        )
      },
      {
        name: 'business-rules',
        message: (errors: any, field: FormlyFieldConfig) => {
          return Object.values(errors || {});
        }
      }
    ]
  }
}
