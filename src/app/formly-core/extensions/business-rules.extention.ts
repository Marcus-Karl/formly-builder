import { FormlyExtension, FormlyFieldConfig } from '@ngx-formly/core';
import { RuleProperties } from 'json-rules-engine';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { getEngineWithRuleset } from '../business-rules/default-engine.rules';

export class BusinessRulesSetupExtension implements FormlyExtension {

  constructor() { }

  prePopulate(field: FormlyFieldConfig) {
    if (field.templateOptions === undefined || field.templateOptions === null) {
      field.templateOptions = {};
    }

    this.setupRules(field);
  }

  setupRules(field: FormlyFieldConfig) {
    if (!field.templateOptions?.businessRules || field.templateOptions['_fieldBusinessRuleEngine']) {
      return;
    }

    let businessRules = field.templateOptions.businessRules as RuleProperties[];

    let validationRules = setupDefaultRules(field, businessRules);

    let fieldRuleEngine = getEngineWithRuleset(businessRules);

    fieldRuleEngine.addFact('mainModel', (params, almanac) => {
      return field.options?.formState.mainModel;
    });

    field.templateOptions['_fieldBusinessRuleEngine'] = fieldRuleEngine;

    if (!field.asyncValidators) {
      field.asyncValidators = {
        validation: []
      };
    } else if (!field.asyncValidators.validation) {
      field.asyncValidators['validation'] = [];
    }

    if (!field.asyncValidators.validation.includes('business-rules')) {
      field.asyncValidators.validation.push('business-rules');
    }
  }
}

const setupDefaultRules = (field: FormlyFieldConfig, businessRules: RuleProperties[]) => {
  let disableRules: RuleProperties[] = []
  let hideRules: RuleProperties[] = []
  let requiredRules: RuleProperties[] = []

  for (let rule of businessRules) {
    if (rule.event.type === 'hide') {
      hideRules.push(rule)
    } else if (rule.event.type === 'disable') {
      disableRules.push(rule);
    } else if (rule.event.type === 'required') {
      requiredRules.push(rule);
    }
  }

  if (!field.expressionProperties) {
    field.expressionProperties = {};
  }

  if (!field.templateOptions) {
    field.templateOptions = {};
  }

  if (hideRules.length > 0) {
    let hideRuleEngine = getEngineWithRuleset(hideRules);

    field.templateOptions['_hideRuleEngine'] = hideRuleEngine;

    let pipe = of(field.options?.formState.mainModel).pipe(map(async mainModel => {
      let result = (await hideRuleEngine.run()).results.filter(result => result.event?.params?.result);

      return result.length > 0;
    }));

    field.expressionProperties['hideExpression'] = pipe;
  }
}

/*
export const validateBusinessRule: FieldValidatorFn = (control: AbstractControl, field: FormlyFieldConfig, options: { [id: string]: any; } = {}): Promise<ValidationErrors | null> => {
  return new Promise(async (resolve, reject) => {
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

        reject(err);
      }
    }

    if (Object.keys(errors).length) {
      resolve({ 'business-rules': errors })
    } else {
      resolve(null); 
    }
  });
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
*/
