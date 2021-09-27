import { FunctionHelpers } from './base.helper';

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
const getNextStep = (form: any, model: any) => {
  if (model['form']) {
    getFormSchema(form, model['form']);
  }

  if (model['pages']) {
    getPageSchemas(form, model['pages']);
  }

  if (model['fields']) {
    getFieldSchema(form, model['fields']);
  }
}


/**
 * SECTION BUILDER
 */
const getFormSchema = (form: any, model: any) => {
  if (!model['settings']) {
    return;
  }

  buildForm(form, model);
}

const getPageSchemas = (form: any, model: any) => {
  if (!Array.isArray(model)) {
    return;
  }

  let pages = model as any[];

  for (const page of pages) {
    buildPage(form, page);
  }
}

const getFieldSchema = (form: any, model: any) => {
  if (!Array.isArray(model)) {
    return;
  }

  let fields = model;

  for (const field of fields) {
    buildFieldSchema(form, field);
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
          "labelPosition": "end"
        }
      }
    },
    "properties": {},
    "required": []
  }`;

  let displayForm = parseJson(schema);

  if (settings['label']) {
    displayForm['title'] = settings['label'];
  }

  if (Object.keys(form)?.length) {
    if (!model['_referenceId']) {
      model['_referenceId'] = FunctionHelpers.generateId();
    }

    form[settings['name'] || model['_referenceId']] = displayForm;
  } else {
    Object.assign(form, displayForm);
  }

  getNextStep(displayForm['properties'], model);
}

const buildPage = (form: any, model: any) => {
  if (!model['settings']) {
    return;
  }

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

  let page = parseJson(schema);

  form[settings['name'] || model['_referenceId']] = page;

  getNextStep(page['properties'], model);
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

const buildDataEntryField = (form: any, model: any) => {
  if (!model['basic']) {
    return;
  }

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

  let field = parseJson(schema);

  form[settings['name'] || model['_referenceId']] = field;
}

const buildDisplayField = (form: any, model: any) => {
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

  let field = parseJson(schema);

  form[settings['name'] || model['_referenceId']] = field;
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

const parseJson = (string: string) => {
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
