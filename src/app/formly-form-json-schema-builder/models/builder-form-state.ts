import { FunctionReferences } from '../builder/state-functions';

export enum SelectionOptionType {
  Base = 'Base',
  FieldCategory = 'FieldCategory',
  FieldType = 'FieldType',
  FieldSubType = 'FieldSubType',
  Form = 'Form',
  ComparisonOperator = 'ComparisonOperator',
  ComparisonType = 'ComparisonType',
  HideComparisonSource = 'HideComparisonSource',
  HideComparisonAgainst = 'HideComparisonAgainst',
  TokenCategory = 'TokenCategory',
  TokenType = 'TokenType'
}

export type SelectionOption = {
  category?: string;
  group?: string;
  label: string;
  value: string;
}

export type FieldInformation = SelectionOption & {
  referenceId: string;
  subType: string;
  type: string;
}

export type PageInformation = {
  fields: FieldInformation[];
  label: string;
  referenceId: string;
}

export type PagesInformation = {
  [key: string]: PageInformation;
}

export type BuilderFormStateProperties = {
  functions: FunctionReferences;
  options: { [key: string]: FormBuilderSelectionOption[] };
  pagesInformation: PagesInformation;
}

export type BuilderFormState = {
  builder: BuilderFormStateProperties;
  mainModel: any;
}

export type FormBuilderSelectionOption = SelectionOption & {
  categories?: string[];
  schemaDefaults?: { [key: string]: any };
  type: SelectionOptionType;
  values?: FormBuilderSelectionOption[];
  [key: string]: any;
}
