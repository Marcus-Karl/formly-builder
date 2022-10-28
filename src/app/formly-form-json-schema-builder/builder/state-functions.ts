import { v4 as uuidv4 } from 'uuid';
import { FieldInformation, PageInformation, PagesInformation } from '../models/builder-form-state';

export const refreshPagesInformation = async (formState: any | undefined | null) => {
  if (!formState?.builder || !formState.mainModel?.form?.pages) {
    return;
  }

  let pagesInformation = formState.builder.pagesInformation = {} as { [key: string]: PageInformation };

  (formState.mainModel.form.pages as any[]).filter(pageModel => pageModel._referenceId).forEach((pageModel: any) => {
    let pageInformation: PageInformation = {
      label: pageModel.settings.label,
      name: pageModel.settings.name || null,
      referenceId: pageModel._referenceId,
      fields: [] as FieldInformation[]
    };

    pagesInformation[pageInformation.referenceId] = pageInformation;

    pageModel.fields?.filter((field: any) => field.basic && field._referenceId).forEach((field: any) => {
      let fieldInformation: FieldInformation = {
        category: field.category,
        group: pageModel.settings.label || pageModel.settings.name || pageInformation.referenceId,
        label: field.basic.label,
        name: field.basic.name || null,
        type: field.basic.type,
        subType: field.basic.subType,
        referenceId: field._referenceId,
        value: field._referenceId,
        options: field.options?.map((option: { value: string, label: string }) => option.value)
      };

      pageInformation.fields.push(fieldInformation);
    });
  });
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

export const getAllFieldInformation = (formState: any): FieldInformation[] => {
  let pages = (formState?.builder?.pagesInformation || {}) as PagesInformation;
  let fields: { [key: string]: FieldInformation } = {};

  // Push page fields on map to ensure distinct return
  Object.values(pages).forEach(page => page.fields?.forEach(field => fields[field.referenceId] = field));

  return Object.values(fields);
}

export const generateId = () => {
  let id = uuidv4().replace(/-/g, '');

  if (/[\d]/.test(id[0])) {
    const letters = 'ghijklmnopqrstuvwxyz';
    const char = letters[Math.floor(Math.random() * (letters.length + 1))];
    id = `${char}${id}`;
  }

  return id;
}

export class FunctionReferences {
  private _formState: any;

  constructor(formState: any) {
    this._formState = formState;
  }

  async refreshPagesInformation(formState: any = this._formState) {
    return await refreshPagesInformation(formState);
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
