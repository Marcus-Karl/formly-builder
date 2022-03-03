import { SelectionOption } from './base-schema-selection-options';
import { FunctionReferences } from './state-functions';

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

export interface BuilderFormStateProperties {
  functions: FunctionReferences;
  options: { [key: string]: SelectionOption[] };
  pagesInformation: PagesInformation;
}

export interface BuilderFormState {
  builder: BuilderFormStateProperties;
  mainModel: any;
}
