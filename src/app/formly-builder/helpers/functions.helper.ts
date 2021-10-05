import { v4 as uuidv4 } from 'uuid';

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

export const refreshPagesInformation = (formState: any | undefined | null) => {
  if (formState?.builder && formState.mainModel?.form?.pages) {
    formState.builder.pagesInformation = {};

    let pagesInformation = formState.builder.pagesInformation as PagesInformation;

    let modelPages = formState.mainModel.form.pages as any[];

    modelPages.filter(pageModel => pageModel._referenceId).forEach((pageModel: any) => {
      let pageInformation: PageInformation = {
        label: pageModel.settings.pageLabel,
        referenceId: pageModel._referenceId,
        fields: []
      };

      pagesInformation[pageInformation.referenceId] = pageInformation;

      pageModel.fields?.filter((field: any) => field.basic && field._referenceId).forEach((field: any) => {
        let fieldInformation: FieldInformation = {
          category: field.category,
          group: pageModel.settings.pageLabel,
          label: field.basic.label,
          type: field.basic.type,
          subType: field.basic.subType,
          referenceId: field._referenceId,
          value: field._referenceId,
        };

        pageInformation.fields.push(fieldInformation);
      });
    });
  }
}

export const getFieldForReference = (fieldReference: string, formState: any) => {
  let pagesInformation = (formState?.builder?.pagesInformation || {}) as PagesInformation;
  let referencedField: FieldInformation | null = null;

  for (let page of Object.values(pagesInformation)) {
    if (referencedField) {
      break;
    }

    for (let field of page.fields) {
      if (field.referenceId === fieldReference) {
        referencedField = field;

        break;
      }
    }
  }

  return referencedField;
}

export const getFieldTypeForReference = (fieldReference: string, formState: any) => {
  let referencedField: FieldInformation | null = getFieldForReference(formState, fieldReference);

  return referencedField?.type;
}

export const getFieldSubTypeForReference = (fieldReference: string, formState: any) => {
  let referencedField: FieldInformation | null = getFieldForReference(formState, fieldReference);

  return referencedField?.subType;
}

export const getAllFieldInformation = (formState: any) => {
  let pages = (formState?.builder?.pagesInformation || {}) as PagesInformation;
  let fields: { [key: string]: FieldInformation } = {};

  // Push page fields on map to ensure distinct return
  Object.values(pages).forEach(page => page.fields?.forEach(field => fields[field.referenceId] = field));

  return Object.values(fields);
}

export const generateId = () => {
  let id = uuidv4().replace(/-/g, '');

  if (/[\d]/.test(id[0])) {
    id = 'ghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 19)] + id;
  }

  return id;
}

export class FunctionReferences {
  private _formState: any;

  constructor(formState: any) {
    this._formState = formState;
  }

  refreshPagesInformation(formState: any = this._formState) {
    return refreshPagesInformation(formState);
  }

  getFieldForReference(fieldReference: string, formState: any = this._formState) {
    return getFieldForReference(fieldReference, formState);
  }

  getFieldTypeForReference(fieldReference: string, formState: any = this._formState) {
    return getFieldTypeForReference(fieldReference, formState);
  }

  getFieldSubTypeForReference(fieldReference: string, formState: any = this._formState) {
    return getFieldSubTypeForReference(fieldReference, formState);
  }

  getAllFieldInformation(formState: any = this._formState) {
    return getAllFieldInformation(formState);
  }
}
