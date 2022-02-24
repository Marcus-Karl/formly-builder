import { FormlyFieldConfig, FormlyTemplateOptions } from '@ngx-formly/core';

import { DateTimeService } from '../services/date-time.service';

export class TokenExtension {
  private static DATE_TIME_SERVICE: DateTimeService | null = null;

  constructor(dateTimeService: DateTimeService) {
    TokenExtension.DATE_TIME_SERVICE = dateTimeService;
  }

  postPopulate(field: FormlyFieldConfig) {
    const to = field.templateOptions || {};

    if (!to._configuredTokens) {
      this.buildTokenMap(field, to);

      to._configuredTokens = true;
    }
  }

  private buildTokenMap(field: FormlyFieldConfig, to: FormlyTemplateOptions) {
    if (!field.options?.formState?.tokens && field.options?.formState?.mainModel && field.options?.formState?.formTokens) {
      let mainModel = field.options.formState.mainModel;
      let keys = Object.keys(field.options.formState.formTokens);

      field.options.formState.tokens = {};

      keys.forEach((key) => {
        this.addToTokenMap(field.options?.formState.tokens, key, field.options?.formState.formTokens, mainModel);
      });
    }

    to._tokens = field.options?.formState.tokens || {};
  }

  private addToTokenMap(tokenMap: any, key: string, tokens: any, model: any) {
    let token = tokens[key];
    let value: any = '';

    if (token?.$ref) {
      let ref = token.$ref as string;
      value = this.getModelValue(tokenMap, token, model, ref.split('.') || []);
    } else {
      value = this.getTokenTypeValue(tokenMap, token, token?.value || '');
    }

    tokenMap[key] = value;
  }

  private getModelValue(tokenMap: any, token: any, model: { [key: string]: any}, keys: string[]): any {
    let key = keys.shift() as string;

    if (keys.length && model[key]) {
      return this.getModelValue(tokenMap, token, model[key], keys);
    }

    if (token?.type === 'function') {
      return this.getTokenTypeValue(tokenMap, token, model);
    }

    return {
      toString: () => this.getTokenTypeValue(tokenMap, token, model[key])
    };
  }

  private getTokenTypeValue(tokenMap: any, token: any, value: any) {
    switch (token?.type) {
      case 'date':
        return TokenExtension.DATE_TIME_SERVICE?.formatDateFromISO(value, token.format);
      case 'datetime':
        return TokenExtension.DATE_TIME_SERVICE?.formatDateAndTimeFromISO(value, token.format);
      case 'siteLink':
        return `<a siteLink="${token.url}" class="site-link link">${value}</a>`;
      case 'externalLink':
        return `<a href="${token.url}" target="_blank" rel="noopener">${value}</a>`;
      case 'function':
        let tokenFunction = Function('token', '{ \'use strict\';' + value + '}');

        return {
          toString: () => tokenFunction(tokenMap)
        };
      default:
        return value;
    }
  }
}
