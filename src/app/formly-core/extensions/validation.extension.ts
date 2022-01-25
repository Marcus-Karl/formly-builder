

import { AbstractControl, ValidationErrors } from '@angular/forms';
import { FormlyFieldConfig, FormlyTemplateOptions } from '@ngx-formly/core';
import { TranslateService } from '@ngx-translate/core';
import { marker as translateMarker } from '@biesbjerg/ngx-translate-extract-marker';

export class ValidationExtension {
  private static TRANSLATE: TranslateService;

  constructor(translate: TranslateService) {
    ValidationExtension.TRANSLATE = translate;
  }

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
        expression: (control: AbstractControl, field: FormlyFieldConfig, options: { [id: string]: any } = {}) => !(control.value < field.templateOptions?.minimumNumber) && !field.formControl?.pristine,
        message: (error: ValidationErrors, field: FormlyFieldConfig) => ValidationExtension.TRANSLATE.instant(
          translateMarker('{value} is less than the mimimum value of {minimumNumber}'),
          { value: field.formControl?.value, minimumNumber: field.templateOptions?.minimumNumber }
        )
      };
    }
  }

  setupMaximumNumber(f: FormlyFieldConfig) {
    if (!f.validators.maximumNumber) {
      f.validators['maximumNumber'] = {
        expression: (control: AbstractControl, field: FormlyFieldConfig, options: { [id: string]: any } = {}) => !(control.value > field.templateOptions?.maximumNumber) && !field.formControl?.pristine,
        message: (control: AbstractControl, field: FormlyFieldConfig) => ValidationExtension.TRANSLATE.instant(
          translateMarker('{value} is greater than the maximum value of {maximumNumber}'),
          { value: control.value, maximumNumber: field.templateOptions?.maximumNumber }
        )
      };
    }
  }
}
