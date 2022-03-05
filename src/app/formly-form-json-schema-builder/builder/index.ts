
import { JSONSchema7 } from 'json-schema';
import { defaultJsonSchema } from '../schemas/formly-form-json-schema-builder.schema';
import { BuilderFormState, PagesInformation, SelectionOptionType, FormBuilderSelectionOption } from '../models/builder-form-state';
import { getDefaultSelectionOptionsMap } from '../models/default-selection-options';
import { FunctionReferences } from './state-functions';

export * as BuilderFunctions from './state-functions';
export * as FunctionHelpers from './state-functions';
export * from './model-to-json-schema-builder';

export const createBuilderFormState = (mainModel: any = {}): BuilderFormState => {
  let formState: BuilderFormState = {
    builder: {
      functions: {} as FunctionReferences,
      options: {
        fieldCategories: [] as FormBuilderSelectionOption[],
        fieldSubTypes: [] as FormBuilderSelectionOption[],
        fieldTypes: [] as FormBuilderSelectionOption[],
        formTypes: [] as FormBuilderSelectionOption[],
        comparisonOperators: [] as FormBuilderSelectionOption[],
        comparisonTypes: [] as FormBuilderSelectionOption[],
        hideComparisonSource: [] as FormBuilderSelectionOption[],
        hideComparisonAgainst: [] as FormBuilderSelectionOption[],
        tokenCategories: [] as FormBuilderSelectionOption[],
        tokenTypes: [] as FormBuilderSelectionOption[],
      },
      pagesInformation: {} as PagesInformation
    },
    mainModel: mainModel
  };

  formState.builder.functions = new FunctionReferences(formState);

  return formState;
}

export const jsonBuilderSchema = (formState: BuilderFormState, selectionOptionsMap?: { [key in SelectionOptionType]: FormBuilderSelectionOption[] }): JSONSchema7 => {
  for (let info in formState.builder.pagesInformation) {
    if (Object.prototype.hasOwnProperty.call(formState.builder.pagesInformation, info)) {
      delete formState.builder.pagesInformation[info];
    }
  }

  let optionsMap = Object.assign({}, getDefaultSelectionOptionsMap());

  if (selectionOptionsMap) {
    Object.assign(optionsMap, selectionOptionsMap);
  }

  let options = formState.builder.options;
  options['fieldCategories'] = optionsMap[SelectionOptionType.FieldCategory];
  options['fieldSubTypes'] = optionsMap[SelectionOptionType.FieldSubType];
  options['fieldTypes'] = optionsMap[SelectionOptionType.FieldType];
  options['formTypes'] = optionsMap[SelectionOptionType.Form];
  options['comparisonOperators'] = optionsMap[SelectionOptionType.ComparisonOperator];
  options['comparisonTypes'] = optionsMap[SelectionOptionType.ComparisonType];
  options['hideComparisonSource'] = optionsMap[SelectionOptionType.HideComparisonSource];
  options['hideComparisonAgainst'] = optionsMap[SelectionOptionType.HideComparisonAgainst];
  options['tokenCategories'] = optionsMap[SelectionOptionType.TokenCategory];
  options['tokenTypes'] = optionsMap[SelectionOptionType.TokenType];

  return defaultJsonSchema(optionsMap) as JSONSchema7;
}

const buildObject = (parent: FormBuilderSelectionOption | null, item: FormBuilderSelectionOption, type: SelectionOptionType): FormBuilderSelectionOption[] => {
  let result = item.values?.map(x => buildObject(item, x, type)) ?? [] as FormBuilderSelectionOption[][];

  let itemsToReturn: FormBuilderSelectionOption[] = ([] as FormBuilderSelectionOption[]).concat(...result);

  if (item.type === type) {
    itemsToReturn.push({
      ...item,
      category: item.category ?? parent?.value
    });
  }

  return itemsToReturn;
}

export const buildSelectionOptions = (item: FormBuilderSelectionOption, type: SelectionOptionType): FormBuilderSelectionOption[] => {
  let options = buildObject(null, item, type);

  return options.filter(x => x.value);
}
