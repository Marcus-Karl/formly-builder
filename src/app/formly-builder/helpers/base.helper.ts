
import { defaultJsonSchema } from './builder-schema.helper';
import { DEFAULT_SELECTION_OPTIONS_MAP, SelectionOption, SelectionOptionType } from './builder-selection-options.helper';
import { BuilderFormState } from './form-state.helper';
import { FunctionReferences, PagesInformation } from './functions.helper';

export * as BuilderFunctions from './functions.helper';
export * as ConvertModel from './model-to-json-schema.helper';
export * as FormBuilderSelectOptions from './builder-selection-options.helper';
export * as FunctionHelpers from './functions.helper';
export * as FormStateHelpers from './functions.helper';

export const createBuilderFormState = (mainModel: any = {}): BuilderFormState => {
  let formState: BuilderFormState = {
    builder: {
      get functions() { return new FunctionReferences(this) },
      options: {
        fieldCategories: [] as SelectionOption[],
        fieldSubTypes: [] as SelectionOption[],
        fieldTypes: [] as SelectionOption[],
        formTypes: [] as SelectionOption[],
        statementComparisonOperators: [] as SelectionOption[],
        statementComparisonTypes: [] as SelectionOption[],
        tokenCategories: [] as SelectionOption[],
        tokenTypes: [] as SelectionOption[],
      },
      pagesInformation: {} as PagesInformation
    },
    mainModel: mainModel
  };

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
  options['statementComparisonOperators'] = optionsMap[SelectionOptionType.StatementComparisonOperator];
  options['statementComparisonTypes'] = optionsMap[SelectionOptionType.StatementComparisonType];
  options['tokenCategories'] = optionsMap[SelectionOptionType.TokenCategory];
  options['tokenTypes'] = optionsMap[SelectionOptionType.TokenType];

  if (selectionOptionsMap) {
    Object.assign(optionsMap, selectionOptionsMap);
  }

  return defaultJsonSchema(optionsMap);
}
