import { FunctionHelpers } from './index';

export const toJsonSchema = (model: any) => {
  if (!model) {
    return null;
  }

  let form = {};

  getNextStep(form, model);

  return form;
}


/**
 * STEPPER
 */
const getNextStep = (obj: any, model: any) => {
  if (model['form']) {
    getFormSchema(obj, model['form']);
  }

  if (model['pages']) {
    getPageSchemas(obj, model['pages']);
  }

  if (model['fields']) {
    getFieldSchema(obj, model['fields']);
  }
}


/**
 * SECTION BUILDER
 */
const getFormSchema = (obj: any, model: any) => {
  if (!model['settings']) {
    return;
  }

  buildForm(obj, model);
}

const getPageSchemas = (obj: any, model: any) => {
  if (!Array.isArray(model)) {
    return;
  }

  for (const page of model) {
    buildPage(obj, page);
  }
}

const getFieldSchema = (obj: any, model: any) => {
  if (!Array.isArray(model)) {
    return;
  }

  for (const field of model) {
    buildFieldSchema(obj, field);
  }
}


/**
 * BUILDERS
 */
const buildForm = (form: any, model: any) => {
  let settings = model['settings'];

  let schema = `{
    "type": "object",
    "widget": {
      "formlyConfig": {
        "type": "${settings['formType']}",
        "defaultValue": {},
        "templateOptions": {
          "verticalStepper": false,
          "linear": false,
          "labelPosition": "end",
          "_translationFormKey": "${FunctionHelpers.generateId()}"
        }
      }
    },
    "properties": {},
    "required": []
  }`;

  let displayForm = safeParseJson(schema);

  if (settings['label']) {
    displayForm['title'] = settings['label'];
  }

  if (Object.keys(form)?.length) {
    if (!model['_referenceId']) {
      model['_referenceId'] = FunctionHelpers.generateId();
    }

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

  getNextStep(displayForm, model);
}

const buildPage = (form: any, model: any) => {
  if (!model['settings'] || !form['properties']) {
    return;
  }

  let formProperties = form['properties'];
  let settings = model['settings'];

  let templateOptions = [
    `"isOptional": false`,
    ...getKvpStrings(settings, 'label'),
    model['_order'] ? `"_order": "${model['_order']}"` : null
  ];

  let schema = `{
    "type": "object",
    "title": "${settings['label']}",
    "widget": {
      "formlyConfig": {
        "defaultValue": {},
        "templateOptions": {
          ${templateOptions.filter(x => !!x)}
        }
      }
    },
    "properties": {},
    "required": []
  }`;

  if (!model['_referenceId']) {
    model['_referenceId'] = FunctionHelpers.generateId();
  }

  let page = safeParseJson(schema);

  if (page?.widget?.formlyConfig?.templateOptions?.required && Array.isArray(form['required'])) {
    form['required'].push(settings['name'] || model['_referenceId']);
  }

  formProperties[settings['name'] || model['_referenceId']] = page;

  getNextStep(page, model);
}

const buildFieldSchema = (form: any, model: any) => {
  if (!model) {
    return;
  }

  if (['free-response-field', 'multiple-choice-field'].includes(model['category'])) {
    return buildDataEntryField(form, model);
  } else if (['display-content-field'].includes(model['category'])) {
    return buildDisplayField(form, model);
  }
}

const buildDataEntryField = (page: any, model: any) => {
  if (!model['basic'] || !page['properties']) {
    return;
  }

  let pageProperties = page['properties'];

  let settings = model['basic'];

  let templateOptions = [
    ...getKvpStrings(model['extra'], 'defaultValue'),
    getOptions(model['options']),
    settings['subType'] ? `"type": "${settings['subType']}"` : null,
    model['_order'] ? `"_order": "${model['_order']}"` : null
  ];

  let extra = model['extra'] || {};

  let schema = `{
    "type": "string",
    "title": "${settings['label']}",
    "widget": {
      "formlyConfig": {
        "type": "${settings['type']}",
        ${extra['defaultValue'] ? `"defaultValue": "${extra['defaultValue']}",` : ''}
        "templateOptions": {
          ${templateOptions.filter(x => !!x)}
        }
      }
    }
  }`;

  if (!model['_referenceId']) {
    model['_referenceId'] = FunctionHelpers.generateId();
  }

  let field = safeParseJson(schema);

  if (field?.widget?.formlyConfig?.templateOptions?.options?.length) {
    const to = field.widget.formlyConfig.templateOptions;
    let options = to.options as any[];

    field['oneOf'] = options.map(x => ({ 'title': x['label'] || null, 'const': x['value'] || null }));

    if (to.multiple && field.widget.formlyConfig?.defaultValue && !Array.isArray(field.widget.formlyConfig.defaultValue)) {
      field.widget.formlyConfig['defaultValue'] = [ extra['defaultValue'] ];
    }
  }

  if (field?.widget?.formlyConfig?.templateOptions?.required && Array.isArray(page['required'])) {
    page['required'].push(settings['name'] || model['_referenceId']);
  }

  pageProperties[settings['name'] || model['_referenceId']] = field;
}

const buildDisplayField = (page: any, model: any) => {
  if (!page['properties']) {
    return;
  }

  let pageProperties = page['properties'];
  let settings = model['basic'] || {};

  let templateOptions = [
    ...getKvpStrings(model['extra'], 'defaultValue'),
    getOptions(model['options']),
    model['_order'] ? `"_order": "${model['_order']}"` : null,
    model['edit'] ? `"html": "${(model['edit'] as string).replace(/"/g, '\\"')}"` : null
  ];

  let extra = model['extra'] || {};

  let schema = `{
    "type": "null",
    "title": "${settings['label'] || 'Display Field'}",
    "widget": {
      "formlyConfig": {
        "type": "${settings['type'] || 'display-html'}",
        ${extra['defaultValue'] ? `"defaultValue": "${extra['defaultValue']}",` : ''}
        "templateOptions": {
          ${templateOptions.filter(x => !!x)}
        }
      }
    }
  }`;

  if (!model['_referenceId']) {
    model['_referenceId'] = FunctionHelpers.generateId();
  }

  let field = safeParseJson(schema);

  pageProperties[settings['name'] || model['_referenceId']] = field;
}


/**
 * HELPERS
 */
const getOptions = (options: any[]) => {
  if (!options?.length) {
    return '';
  }

  return `"options": [
    ${options.map(x => `{
      "label": "${x['label']}",
      "value": "${x['value']}",
      "group": "${x['group'] || ''}",
      "_order": "${x['_order'] || ''}",
      "_referenceId": "${x['_referenceId'] || ''}"
    }`)}
  ]`;
}

const getKvpStrings = (model: any, ...ignoreKeys: string[]): string[] => {
  let kvpArray: string[] = [];

  if (model) {
    Object.keys(model).forEach(key => {
      if (model[key] && ignoreKeys.indexOf(key) === -1) {
        kvpArray.push(`"${key}": "${model[key]}"`);
      }
    });
  }

  return kvpArray;
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
