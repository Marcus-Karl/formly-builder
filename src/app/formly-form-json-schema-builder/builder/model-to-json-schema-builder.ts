import { FormlyFieldConfig } from '@ngx-formly/core';
import { BuilderFormState, SelectionOptionType } from '../models/builder-form-state';
import { FunctionHelpers } from './index';

export class ConvertModel {

  private _config: any;
  private _formState: BuilderFormState;

  constructor(formState: BuilderFormState, config?: any) {
    this._formState = formState;
    this._config = config;
  }

  public static toJsonSchema(model: any, formState: BuilderFormState, config: any = {}) {
    if (!model) {
      return null;
    }

    if (!formState?.builder?.options) {
      console.error(`Invalid formState passed to json schema builder.`);

      return null;
    }

    const form = {};

    new ConvertModel(formState, config).getNextStep(form, model);

    return form;
  }



  /**
   * STEPPER
   */
  private getNextStep = (obj: any, model: any) => {
    if (model['form']) {
      this.getFormSchema(obj, model['form']);
    }

    if (model['pages']) {
      this.getPageSchemas(obj, model['pages']);
    }

    if (model['fields']) {
      this.getFieldSchema(obj, model['fields']);
    }
  }


  /**
   * SECTION BUILDER
   */
  private getFormSchema = (obj: any, model: any) => {
    if (!model['settings']) {
      return;
    }

    this.buildForm(obj, model);
  }

  private getPageSchemas = (obj: any, model: any) => {
    if (!Array.isArray(model)) {
      return;
    }

    for (const page of model) {
      this.buildPage(obj, page);
    }
  }

  private getFieldSchema = (obj: any, model: any) => {
    if (!Array.isArray(model)) {
      return;
    }

    for (const field of model) {
      this.buildFieldSchema(obj, field);
    }
  }


  /**
   * BUILDERS
   */
  private buildForm = (form: any, model: { [key: string]: any }) => {
    const settings = model['settings'];

    if (!model['_referenceId']) {
      model['_referenceId'] = FunctionHelpers.generateId();
    }

    const displayForm = {
      type: 'object',
      default: {},
      widget: {
        formlyConfig: {} as FormlyFieldConfig
      },
      properties: {},
      required: []
    };

    const defaultSchema = this._getDefaultSchemaForKeyAndType(settings['type'], SelectionOptionType.Form);

    if (defaultSchema) {
      mergeData(displayForm, deepCopy(defaultSchema) ?? {});
    }

    const modelSettings = {
      ...settings['label'] && { title: settings['label'] },
      widget: {
        ...model['_referenceId'] && { _referenceId: model['_referenceId'] },
        formlyConfig: {
          ...settings['type'] && { type: settings['type'] }
        }
      }
    }

    mergeData(displayForm, modelSettings);

    if (Object.keys(form)?.length) {
      if (displayForm?.widget?.formlyConfig?.props?.required && Array.isArray(form['required'])) {
        form['required'].push(settings['name'] || model['_referenceId']);
      }

      if (form['properties']) {
        form['properties'][settings['name'] || model['_referenceId']] = displayForm;
      } else {
        form[settings['name'] || model['_referenceId']] = displayForm;
      }
    } else {
      Object.assign(form, displayForm);
    }

    this.getNextStep(displayForm, model);
  }

  private buildPage = (form: any, model: any) => {
    if (!model['settings'] || !form['properties']) {
      return;
    }

    const settings = model['settings'];

    if (!model['_referenceId']) {
      model['_referenceId'] = FunctionHelpers.generateId();
    }

    const page = {
      type: 'object',
      default: {},
      widget: {
        formlyConfig: {
          props: {
            required: false
          }
        } as FormlyFieldConfig
      },
      properties: {},
      required: []
    };

    const modelSettings = {
      ...settings['label'] && { title: settings['label'] },
      widget: {
        ...model['_referenceId'] && { _referenceId: model['_referenceId'] },
        formlyConfig: {
          ...settings['type'] && { type: settings['type'] },
          props: {
            ...this.getKvps(model['extra'], 'label'),
            ...model['_order'] !== undefined && { _order: model['_order'] }
          }
        }
      }
    }

    mergeData(page, modelSettings);

    if (page.widget.formlyConfig.props?.required && Array.isArray(form['required'])) {
      form['required'].push(settings['name'] || model['_referenceId']);
    }

    const formProperties = form['properties'];

    formProperties[settings['name'] || model['_referenceId']] = page;

    this.getNextStep(page, model);
  }

  private buildFieldSchema = (form: any, model: any) => {
    if (!model) {
      return;
    }

    return this.buildDataEntryField(form, model);
  }

  private buildDataEntryField = (page: any, model: any) => {
    if (!model['basic'] || !page['properties']) {
      return;
    }

    const settings = model['basic'];
    const extra = model['extra'] ?? {};

    const field: { [key: string]: any } = {
      type: 'string',
      widget: { formlyConfig: {} as FormlyFieldConfig }
    };

    const defaultSchema = this._getDefaultSchemaForKeyAndType(settings['type'], SelectionOptionType.FieldType, model['category']);

    if (defaultSchema) {
      mergeData(field, deepCopy(defaultSchema) ?? {});
    }

    if (!model['_referenceId']) {
      model['_referenceId'] = FunctionHelpers.generateId();
    }

    const options = this.getOptions(model['options']);

    const modelSettings = {
      ...settings['label'] && { title: settings['label'] },
      ...options && { enum: options.map(x => x.value) },
      ...extra['defaultValue'] && { default: extra['defaultValue'] },
      widget: {
        ...model['_referenceId'] && { _referenceId: model['_referenceId'] },
        formlyConfig: {
          ...settings['type'] && { type: settings['type'] },
          props: {
            ...model['edit'] && { html: model['edit'] },
            ...this.getKvps(extra, 'defaultValue'),
            ...options && { options: options },
            ...model['_order'] !== undefined && { _order: model['_order'] },
          }
        }
      }
    };

    mergeData(field, modelSettings);

    if (field.widget.formlyConfig.props?.multiple) {
      if (extra['defaultValue']) {
        field.default = Array.isArray(extra['defaultValue']) ? extra['defaultValue'] : [extra['defaultValue']];
      } else {
        field.default = [];
      }
    }

    if (field?.widget?.formlyConfig?.props?.required && Array.isArray(page['required'])) {
      page['required'].push(settings['name'] || model['_referenceId']);
    }

    const pageProperties = page['properties'];
    pageProperties[settings['name'] || model['_referenceId']] = field;
  }


  /**
   * HELPERS
   */
  private getOptions = (options: any[]): Array<{ [key: string]: string }> | null => {
    if (!options?.length) {
      return null;
    }

    options.forEach(option => {
      Object.keys(option ?? {}).forEach(key => option[key] === undefined && delete option[key]);

      if (!option['_referenceId']) {
        option['_referenceId'] = FunctionHelpers.generateId();
      }
    });

    return options;
  }

  private getKvps = (model: any, ...ignoreKeys: string[]): { [key: string]: any } => {
    const items: { [key: string]: any } = {};

    Object.keys(model ?? {}).forEach(key => {
      if (model[key] && !ignoreKeys.includes(key)) {
        items[key] = model[key];
      }
    });

    return items;
  }

  private _getDefaultSchemaForKeyAndType(key: string, type: SelectionOptionType, category?: string) {
    const options = this._formState.builder.options[type];

    if (options === undefined) {
      console.log(`Unable to find SelectionOptionType ${type} in BuilderFormStateProperties options map.`);

      return;
    }

    if (category) {
      return options.find(option => option.value === key && option.category === category)?.schemaDefaults;
    }

    return options.find(option => option.value === key)?.schemaDefaults;
  }
}

const deepCopy = (obj: any): { [key: string]: any } | Array<{ [key: string]: any }> | undefined | null => {
  if (obj === undefined) {
    return undefined;
  } else if (obj === null) {
    return null;
  }

  if (Array.isArray(obj)) {
    return obj
      .map(element => deepCopy(element))
      .filter(copiedElement => copiedElement !== undefined);
  } else if (typeof obj === 'object') {
    const copiedProperties = {} as { [key: string]: any };

    for (const key in obj) {
      const copy = deepCopy(obj[key]);

      if (copy !== undefined) {
        copiedProperties[key] = copy;
      }
    }

    return copiedProperties;
  }

  return obj;
}

const mergeData = (dest: { [key: string]: any }, source: { [key: string]: any }) => {
  if (dest === undefined) {
    return source;
  }

  for (const sourceKey in source) {
    if (source[sourceKey] === undefined) {
      continue;
    }

    if (dest[sourceKey] === undefined || dest[sourceKey] === null) {
      dest[sourceKey] = source[sourceKey];
    } else if (Array.isArray(dest[sourceKey])) {
      if (Array.isArray(source[sourceKey])) {
        (dest[sourceKey] as any[]).push(...source[sourceKey]);
      } else {
        dest[sourceKey] = source[sourceKey];
      }
    } else if (typeof dest[sourceKey] === 'object') {
      dest[sourceKey] = mergeData(dest[sourceKey], source[sourceKey]);
    } else {
      dest[sourceKey] = source[sourceKey];
    }
  }

  return dest;
}




const safeParseJson = (string: string) => {
  try {
    return JSON.parse(string);
  } catch (e) {
    console.error('JSON parse error', string, e);
  }

  return null;
}
