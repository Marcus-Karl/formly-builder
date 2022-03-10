import * as _ from 'lodash';
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

    let form = {};

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
    let settings = model['settings'];

    if (!model['_referenceId']) {
      model['_referenceId'] = FunctionHelpers.generateId();
    }

    let displayForm: any = {
      type: 'object',
      title: null,
      widget: {
        _referenceId: null,
        formlyConfig: {
          type: null,
          defaultValue: {},
          templateOptions: {}
        }
      },
      properties: {},
      required: []
    };

    let defaultSchema = this._getDefaultSchemaForKeyAndType(settings['type'], SelectionOptionType.Form);

    if (defaultSchema) {
      _.merge(displayForm, JSON.parse(JSON.stringify(defaultSchema)));
    }

    let modelSettings = {
      ...settings['label'] && { title: settings['label'] },
      widget: {
        ...model['_referenceId'] && { _referenceId: model['_referenceId'] },
        formlyConfig: {
          ...settings['type'] && { type: settings['type'] },
          templateOptions: {
            _translationFormKey: model['_referenceId'] || FunctionHelpers.generateId(),
          }
        }
      }
    }

    _.merge(displayForm, modelSettings);

    if (Object.keys(form)?.length) {
      if (displayForm?.widget?.formlyConfig?.templateOptions?.required && Array.isArray(form['required'])) {
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

    let settings = model['settings'];

    if (!model['_referenceId']) {
      model['_referenceId'] = FunctionHelpers.generateId();
    }

    let page = {
      type: 'object',
      title: null,
      widget: {
        _referenceId: null,
        formlyConfig: {
          defaultValue: {},
          templateOptions: {
            required: false
          }
        }
      },
      properties: {},
      required: []
    };

    let modelSettings = {
      ...settings['label'] && { title: settings['label'] },
      widget: {
        ...model['_referenceId'] && { _referenceId: model['_referenceId'] },
        formlyConfig: {
          ...settings['type'] && { type: settings['type'] },
          templateOptions: {
            ...this.getKvps(model['extra'], 'label'),
            ...model['_order'] !== undefined && { _order: model['_order'] }
          }
        }
      }
    }

    _.merge(page, modelSettings);

    if (page.widget.formlyConfig.templateOptions.required && Array.isArray(form['required'])) {
      form['required'].push(settings['name'] || model['_referenceId']);
    }

    let formProperties = form['properties'];

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

    let settings = model['basic'];
    let extra = model['extra'] ?? {};

    let field: any = {
      type: 'string',
      title: null,
      widget: {
        _referenceId: null,
        formlyConfig: {
          type: null,
          defaultValue: '',
          templateOptions: {}
        }
      }
    };

    let defaultSchema = this._getDefaultSchemaForKeyAndType(settings['type'], SelectionOptionType.FieldType, model['category']);

    if (defaultSchema) {
      _.merge(field, JSON.parse(JSON.stringify(defaultSchema)));
    }

    if (!model['_referenceId']) {
      model['_referenceId'] = FunctionHelpers.generateId();
    }

    let options = this.getOptions(model['options']);

    let modelSettings = {
      ...settings['label'] && { title: settings['label'] },
      ...options && { enum: options.map(x => x.value) },
      widget: {
        ...model['_referenceId'] && { _referenceId: model['_referenceId'] },
        formlyConfig: {
          ...settings['type'] && { type: settings['type'] },
          ...extra['defaultValue'] && { defaultValue: extra['defaultValue'] },
          templateOptions: {
            ...model['edit'] && { html: model['edit'] },
            ...this.getKvps(extra, 'defaultValue'),
            ...options && { options: options },
            ...model['_order'] !== undefined && { _order: model['_order'] },
          }
        }
      }
    };

    _.merge(field, modelSettings);

    if (field.widget.formlyConfig.templateOptions.multiple) {
      if (extra['defaultValue']) {
        field.widget.formlyConfig.defaultValue = Array.isArray(extra['defaultValue']) ? extra['defaultValue'] : [extra['defaultValue']];
      } else {
        field.widget.formlyConfig.defaultValue = [];
      }
    }

    if (field?.widget?.formlyConfig?.templateOptions?.required && Array.isArray(page['required'])) {
      page['required'].push(settings['name'] || model['_referenceId']);
    }

    let pageProperties = page['properties'];
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
    let items: { [key: string]: any } = {};

    Object.keys(model ?? {}).forEach(key => {
      if (model[key] && !ignoreKeys.includes(key)) {
        items[key] = model[key];
      }
    });

    return items;
  }

  private _getDefaultSchemaForKeyAndType(key: string, type: SelectionOptionType, category?: string) {
    let options = this._formState.builder.options[type];

    if (!options === undefined) {
      console.log(`Unable to find SelectionOptionType ${type} in BuilderFormStateProperties options map.`);

      return;
    }

    if (category) {
      return options.find(option => option.value === key && option.category === category)?.schemaDefaults;
    }

    return options.find(option => option.value === key)?.schemaDefaults;
  }
}







const safeParseJson = (string: string) => {
  try {
    return JSON.parse(string);
  } catch (e) {
    console.error('JSON parse error', string, e);
  }

  return null;
}

const getBusinessRule = (model: any) => {
  if (!model['leftHandSide'] || !model['operator'] || !model['rightHandSide']) {
    return null;
  }

  let leftHandSide = model['leftHandSide'];
  let operator = model['operator'];
  let rightHandSide = model['rightHandSide'];




  return null;
}

/*
{
  "conditions": {
    "all": [
      {
        "fact": "defendant",
        "path": "$.dmv.dmvNumber",
        "operator": "patternDoesNotMatch",
        "value": "^\\d{1,8}$"
      },
      {
        "fact": "defendant",
        "path": "$.dmv.dmvState",
        "operator": "equal",
        "value": "NC"
      }
    ]
  },
  "event": {
    "type": "When submitting a process.",
    "params": {
      "reqNum": "CLOUD-4190",
      "errorMessage": "DMV ID must be less than or equal to 8 numeric characters when DMV State is NC.",
      "errorCode": "CLOUD-4190"
    }
  }
}
*/
