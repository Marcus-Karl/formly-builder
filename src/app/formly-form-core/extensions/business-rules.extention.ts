import { FormlyExtension, FormlyFieldConfig } from '@ngx-formly/core';
import { RuleProperties } from 'json-rules-engine';

import { getEngineWithRuleset } from '../business-rules/default-engine.rules';

export class BusinessRulesSetupExtension implements FormlyExtension {

  constructor() { }

  prePopulate(field: FormlyFieldConfig) {
    this.setupValidationRules(field);
  }

  setupValidationRules(field: FormlyFieldConfig) {
    if (!field.templateOptions?.businessRules || field.templateOptions['_fieldBusinessRuleEngine']) {
      return;
    }

    let fieldRuleEngine = getEngineWithRuleset(field.templateOptions.businessRules as RuleProperties[]);

    fieldRuleEngine.addFact('mainModel', (params, almanac) => field.options?.formState.mainModel);

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

    if (!field.modelOptions) {
      field.modelOptions = {};
    }

    // field.modelOptions['updateOn'] = 'blur';
  }
}
