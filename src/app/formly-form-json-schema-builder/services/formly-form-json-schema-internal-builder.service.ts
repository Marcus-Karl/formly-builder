import { Injectable } from '@angular/core';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { BuilderFormState } from '../models/builder-form-state';

@Injectable({ providedIn: 'root' })
export class FormlyFormJsonSchemaInternalBuilderService {
  private _formState: BuilderFormState | null;
  private _options: FormlyFormOptions | null;
  private _pageDropsIds: string[];
  private _pageDropsIdsMap: { [key: string]: string };
  private _pageField: FormlyFieldConfig | null;
  private _tokenField: FormlyFieldConfig | null;

  constructor() {
    this._formState = null;
    this._options = null;
    this._pageDropsIds = [];
    this._pageDropsIdsMap = {}
    this._pageField = null;
    this._tokenField = null;
  }

  refreshPageStates() {
    this._formState?.builder.functions.refreshPagesInformation()
      .catch(error => console.error(`Error refreshing page state`, error))
      .finally(() => {});
  }

  getPageField() {
    return this._pageField;
  }

  getTokenField() {
    return this._tokenField;
  }

  getRegisteredDropIdForPage(page: FormlyFieldConfig) {
    if (page && this._pageDropsIdsMap[page.id as string]) {
      return this._pageDropsIdsMap[page.id as string];
    }

    return '';
  }

  getRegisteredDropIds(...filterIds: string[]) {
    return this._pageDropsIds.filter(id => !filterIds.includes(id));
  }

  getRegisteredDropIdsExceptForPage(page?: FormlyFieldConfig) {
    if (page?.id && this._pageDropsIdsMap[page.id]) {
      return this.getRegisteredDropIds(this._pageDropsIdsMap[page.id]);
    }

    return this.getRegisteredDropIds();
  }

  registerPageDropIds(page: FormlyFieldConfig) {
    let pageDescendantField = this._findFirstDescendantsByKey(page, 'fields');

    if (pageDescendantField?.id && !this._pageDropsIds.includes(pageDescendantField.id)) {
      this._pageDropsIds.push(pageDescendantField.id);

      if (page?.id) {
        this._pageDropsIdsMap[page.id] = pageDescendantField.id;
      }
    }
  }

  removePageDropId(page: FormlyFieldConfig) {
    if (page?.id) {
      let index = this._pageDropsIds.findIndex(x => x === this._pageDropsIdsMap[page.id as string]);

      if (index >= 0) {
        this._pageDropsIds.splice(index, 1);
      }

      delete this._pageDropsIdsMap[page.id];
    }
  }

  registerMajorFormSections(field: FormlyFieldConfig) {
    let rootField = this._findFormRoot(field);

    if (!rootField) {
      console.error(`Unable to determine form root from field: ${field?.id}`);
      return;
    }

    this._pageField = this._findFirstDescendantsByKey(rootField, 'pages');
    this._tokenField = this._findFirstDescendantsByKey(rootField, 'tokens');

    this._options = rootField.options ?? null;
    this._formState = this._options?.formState;

    this.refreshPageStates();
  }

  private _findFirstDescendantsByKey(field: FormlyFieldConfig, key: string): FormlyFieldConfig | null {
    if (!field?.fieldGroup?.length) {
      return null;
    }

    let child = field.fieldGroup.find(x => x.key === key);

    if (child) {
      return child;
    }

    let descendants = field.fieldGroup.map(x => this._findFirstDescendantsByKey(x, key)) as FormlyFieldConfig[];

    return descendants.find(x => !!x) || null;
  }

  private _findFormRoot(field: FormlyFieldConfig): FormlyFieldConfig {
    if (!field?.parent) {
      return field;
    }

    return this._findFormRoot(field.parent);
  }
}
