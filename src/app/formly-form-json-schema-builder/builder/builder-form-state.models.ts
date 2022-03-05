import { FunctionReferences } from './state-functions';

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

export interface FieldInformation {
  category: string;
  group: string;
  label: string;
  referenceId: string;
  subType: string;
  type: string;
  value: string;
}

export interface PageInformation {
  fields: FieldInformation[];
  label: string;
  referenceId: string;
}

export interface PagesInformation {
  [key: string]: PageInformation;
}

export interface SelectionOption {
  category: string | string[] | null;
  group: string | null;
  label: string;
  value: string;
  [key: string]: any;
}

export interface BuilderFormStateProperties {
  functions: FunctionReferences;
  options: { [key: string]: SelectionOption[] };
  pagesInformation: PagesInformation;
}

export interface BuilderFormState {
  builder: BuilderFormStateProperties;
  mainModel: any;
}

export interface FormBuilderSelectionOption {
  category?: string;
  categories?: string[];
  group?: string;
  key: string;
  label: string;
  type: SelectionOptionType;
  values?: FormBuilderSelectionOption[];
  schemaDefaults?: { [key: string]: any };
  [key: string]: any;
}