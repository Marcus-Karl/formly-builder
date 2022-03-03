import { SelectionOption } from './builder-selection-options.helper';
import {
  FunctionReferences,
  PagesInformation
} from './functions.helper';

export interface BuilderFormStateProperties {
  functions: FunctionReferences;
  options: { [key: string]: SelectionOption[] };
  pagesInformation: PagesInformation;
}

export interface BuilderFormState {
  builder: BuilderFormStateProperties;
  mainModel: any;
}
