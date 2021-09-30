import { AbstractControl, ValidationErrors } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FieldValidatorFn } from '@ngx-formly/core/lib/services/formly.config';
import { Engine, EngineResult } from 'json-rules-engine';

import { evaluateFactsWithEngine } from '../business-rules/default-engine.rules';

export const validateBusinessRule: FieldValidatorFn = async (control: AbstractControl, field: FormlyFieldConfig, options: { [id: string]: any; } = {}) => {
    let errors: { [id: string]: any } = {};

    if (field.templateOptions && field.templateOptions['_fieldBusinessRuleEngine']) {
      let fieldRuleEngine = field.templateOptions['_fieldBusinessRuleEngine'] as Engine;

      try {
        let engineResult: EngineResult = await evaluateFactsWithEngine(fieldRuleEngine, field.options?.formState.mainModel || {});

        for (let event of engineResult.failureEvents || []) {
          let result = event.params ? !event.params.result : false;

          evaluteFieldChangeResult(control, field, event.type, result);
        }

        for (let event of engineResult.events || []) {
          let result = event.params ? event.params.result : false;

          if (!evaluteFieldChangeResult(control, field, event.type, result)) {
            errors[event.type] = event.params?.message || '';
          }
        }
      } catch (err) {
        console.error(err);
        throw err;
      }
    }

    if (Object.keys(errors).length) {
      return { 'business-rules': errors } as ValidationErrors;
    }

    return null;
}

const evaluteFieldChangeResult = (control: AbstractControl, field: FormlyFieldConfig, type: string, result: boolean) => {
  let matched = false;

  if (type === 'hide') {
    field.hide = result;

    matched = true;
  } else if (type === 'disable') {
    if (result && control.enabled) {
      control.disable();
    } else if (!result && control.disabled) {
      control.enable();
    }

    matched = true;
  } else if (field.templateOptions && type === 'required') {
    field.templateOptions['required'] = result;

    matched = true;
  }

  return matched;
}
