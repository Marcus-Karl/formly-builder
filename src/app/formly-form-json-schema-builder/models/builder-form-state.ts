import { FunctionReferences } from '../builder/state-functions';

export enum SelectionOptionType {
  Base = 'Base',
  FieldCategory = 'FieldCategory',
  FieldType = 'FieldType',
  FieldSubType = 'FieldSubType',
  Form = 'Form',
  FormCategory = 'FormCategory'
}

export type SelectionOption = {
  category?: string;
  group?: string;
  label: string;
  value: string;
}

export type FieldInformation = SelectionOption & {
  name: string | null;
  referenceId: string;
  subType: string;
  options: string[];
  type: string;
}

export type PageInformation = {
  fields: FieldInformation[];
  label: string;
  name: string | null;
  referenceId: string;
}

export type PagesInformation = {
  [key: string]: PageInformation;
}

export type BuilderFormStateProperties = {
  functions: FunctionReferences;
  options: { [key in SelectionOptionType]: FormBuilderSelectionOption[] };
  pagesInformation: PagesInformation;
}

export type BuilderFormState = {
  builder: BuilderFormStateProperties;
  mainModel: any;
}

export type FormBuilderSelectionOption = SelectionOption & {
  categories?: string[];
  options?: FormBuilderSelectionOption[];
  builderSchemaDefaults?: { [key: string]: any };
  schemaDefaults?: { [key: string]: any };
  type: SelectionOptionType;
  [key: string]: any;
}
