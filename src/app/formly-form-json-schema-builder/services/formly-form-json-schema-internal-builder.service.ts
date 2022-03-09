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

  public refreshPageStates() {
    this._formState?.builder.functions.refreshPagesInformation()
      .catch(error => console.error(`Error refreshing page state`, error))
      .finally(() => { });
  }

  public getPageField() {
    return this._pageField;
  }

  public getTokenField() {
    return this._tokenField;
  }

  public getRegisteredDropIdForPage(page: FormlyFieldConfig) {
    if (page && this._pageDropsIdsMap[page.id as string]) {
      return this._pageDropsIdsMap[page.id as string];
    }

    return '';
  }

  public getRegisteredDropIds(...filterIds: string[]) {
    return this._pageDropsIds.filter(id => !filterIds.includes(id));
  }

  public getRegisteredDropIdsExceptForPage(page?: FormlyFieldConfig) {
    if (page?.id && this._pageDropsIdsMap[page.id]) {
      return this.getRegisteredDropIds(this._pageDropsIdsMap[page.id]);
    }

    return this.getRegisteredDropIds();
  }

  public registerPageDropIds(page: FormlyFieldConfig) {
    let pageDescendantField = this.findFirstDescendantsByKey(page, 'fields');

    if (pageDescendantField?.id && !this._pageDropsIds.includes(pageDescendantField.id)) {
      this._pageDropsIds.push(pageDescendantField.id);

      if (page?.id) {
        this._pageDropsIdsMap[page.id] = pageDescendantField.id;
      }
    }
  }

  public removePageDropId(page: FormlyFieldConfig) {
    if (page?.id) {
      let index = this._pageDropsIds.findIndex(x => x === this._pageDropsIdsMap[page.id as string]);

      if (index >= 0) {
        this._pageDropsIds.splice(index, 1);
      }

      delete this._pageDropsIdsMap[page.id];
    }
  }

  public registerMajorFormSections(field: FormlyFieldConfig) {
    let rootField = this.findFormRoot(field);

    if (!rootField) {
      console.error(`Unable to determine form root from field: ${field?.id}`);
      return;
    }

    this._pageField = this.findFirstDescendantsByKey(rootField, 'pages');
    this._tokenField = this.findFirstDescendantsByKey(rootField, 'tokens');

    this._options = rootField.options ?? null;
    this._formState = this._options?.formState;

    this.refreshPageStates();
  }

  public findFirstDescendantsByKey(field: FormlyFieldConfig, key: string): FormlyFieldConfig | null {
    if (!field?.fieldGroup?.length) {
      return null;
    }

    let child = field.fieldGroup.find(x => x.key === key);

    if (child) {
      return child;
    }

    let descendants = field.fieldGroup.map(x => this.findFirstDescendantsByKey(x, key)) as FormlyFieldConfig[];

    return descendants.find(x => !!x) || null;
  }

  public findAllDescendantsByKey(field: FormlyFieldConfig, key: string): FormlyFieldConfig[] {
    if (!field?.fieldGroup?.length) {
      return [];
    }

    let matches: FormlyFieldConfig[] = [];

    field.fieldGroup.forEach(child => {
      if (child.key === key) {
        matches.push(child);
      }

      matches.push(...this.findAllDescendantsByKey(child, key));
    });

    return matches;
  }

  public findFirstAncestoryByType(field: FormlyFieldConfig, type: string): FormlyFieldConfig | undefined {
    if (field?.type === type) {
      return field;
    }

    if (!field?.parent) {
      return;
    }

    return this.findFirstAncestoryByType(field.parent, type);
  }

  public findFormRoot(field: FormlyFieldConfig): FormlyFieldConfig {
    if (!field?.parent) {
      return field;
    }

    return this.findFormRoot(field.parent);
  }
}
