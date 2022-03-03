
import { defaultJsonSchema } from '../formly-form-json-schema-builder.schema';
import { DEFAULT_SELECTION_OPTIONS_MAP, SelectionOption, SelectionOptionType } from './schema-builder-selection-options';
import { BuilderFormState, PagesInformation } from './builder-form-state.models';
import { FunctionReferences } from './state-functions';

export * as BuilderFunctions from './state-functions';
export * as ConvertModel from './model-to-json-schema-builder';
export * as FormBuilderSelectOptions from './schema-builder-selection-options';
export * as FunctionHelpers from './state-functions';

export const createBuilderFormState = (mainModel: any = {}): BuilderFormState => {
  let formState: BuilderFormState = {
    builder: {
      functions: {} as FunctionReferences,
      options: {
        fieldCategories: [] as SelectionOption[],
        fieldSubTypes: [] as SelectionOption[],
        fieldTypes: [] as SelectionOption[],
        formTypes: [] as SelectionOption[],
        comparisonOperators: [] as SelectionOption[],
        comparisonTypes: [] as SelectionOption[],
        hideComparisonSource: [] as SelectionOption[],
        hideComparisonAgainst: [] as SelectionOption[],
        tokenCategories: [] as SelectionOption[],
        tokenTypes: [] as SelectionOption[],
      },
      pagesInformation: {} as PagesInformation
    },
    mainModel: mainModel
  };

  formState.builder.functions = new FunctionReferences(formState);

  return formState;
}

export const jsonBuilderSchema = (formState: BuilderFormState, selectionOptionsMap?: { [key in SelectionOptionType]: SelectionOption[] }) => {
  for (let info in formState.builder.pagesInformation) {
    if (Object.prototype.hasOwnProperty.call(formState.builder.pagesInformation, info)) {
      delete formState.builder.pagesInformation[info];
    }
  }

  let optionsMap = Object.assign({}, DEFAULT_SELECTION_OPTIONS_MAP);

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

  if (selectionOptionsMap) {
    Object.assign(optionsMap, selectionOptionsMap);
  }

  return defaultJsonSchema(optionsMap);
}
