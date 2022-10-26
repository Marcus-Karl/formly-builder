import { FormlyFieldConfig } from '@ngx-formly/core';
import { BehaviorSubject, Subject } from 'rxjs';

export class FormInfo {
  public readonly changePage$ = new Subject<{ id: string; selectionIndex: number; }>();
  public readonly nextPage = new Subject<number>();
  public readonly previousPage = new Subject<number>();
  public readonly selectionIndex$ = new BehaviorSubject<number>(0);

  private readonly _formStack: FormlyFieldConfig[] = [];
  private readonly _selectionIndexInfoMap: { [key: string]: number } = {};

  constructor() {
    this.changePage$.subscribe(request => {
      this._selectionIndexInfoMap[request.id] = request.selectionIndex;
    });
  }

  addForm(field: FormlyFieldConfig) {
    if (field && !this._formStack.find(x => x === field)) {
      let stackIndex = this._formStack.push(field) - 1;

      if (field.id) {
        this._selectionIndexInfoMap[field.id] = -1;
      }

      this.incrementFormPage(stackIndex);
    }
  }

  removeForm(field: FormlyFieldConfig) {
    if (field) {
      if (field.id) {
        delete this._selectionIndexInfoMap[field.id];
      }

      let index = this._formStack.findIndex(x => x === field);

      if (index >= 0) {
        this._formStack.splice(index, 0);
      }
    }
  }

  canContinue(field: FormlyFieldConfig = this._formStack[this._formStack.length - 1]) {
    if (field?.id && this._selectionIndexInfoMap[field.id] !== undefined) {
      return this.isPrecedingPageInvalid(this._selectionIndexInfoMap[field.id], false, field);
    }

    return false;
  }

  isPrecedingPageInvalid(index: number, includeOptionalPageCheck = false, field: FormlyFieldConfig = this._formStack[this._formStack.length - 1]): boolean {
    if (!field) {
      return true;
    }

    if (index === 0) {
      return this.isPageAtIndexInvalid(index, includeOptionalPageCheck, field);
    }

    return this.isPageAtIndexInvalid(index, includeOptionalPageCheck, field) || this.isPrecedingPageInvalid(index - 1, includeOptionalPageCheck, field);
  }

  isPageAtIndexInvalid(index: number, includeOptionalPageCheck = true, field: FormlyFieldConfig): boolean {
    let page = field.fieldGroup && field.fieldGroup[index];

    let valid = (page?.formControl?.invalid || false) && !page.hide && (page.props?.isOptional ? includeOptionalPageCheck : true);

    return valid;
  }

  hasBackPage(stackIndex: number = this._formStack.length - 1): boolean {
    let form = this._formStack[stackIndex];
    let index = Number(form?.id && this._selectionIndexInfoMap[form.id]);
    let page = index > -1 ? form.fieldGroup?.slice(0, index)?.find(x => !x.hide) : undefined;

    return page !== undefined || stackIndex > 0 && this.hasBackPage(stackIndex - 1);
  }

  hasForwardPage(stackIndex: number = this._formStack.length - 1): boolean {
    let form = this._formStack[stackIndex];
    let index = Number(form?.id && this._selectionIndexInfoMap[form.id]);
    let page = index > -1 ? form.fieldGroup?.slice(index + 1)?.find(x => !x.hide) : undefined;

    return page !== undefined || stackIndex < this._formStack.length && this.hasForwardPage(stackIndex + 1);
  }

  decrementFormPage(stackIndex: number = this._formStack.length - 1) {
    let field = this._formStack[stackIndex];

    if (field?.fieldGroup && field.id && this._selectionIndexInfoMap[field.id] !== undefined) {
      let index = this._selectionIndexInfoMap[field.id] - 1;

      for (let i = index; i >= 0; i--) {
        if (!field.fieldGroup[i].hide) {
          this.changePage(i, field);

          return;
        }
      }

      this.decrementFormPage(stackIndex - 1);
    }
  }

  incrementFormPage(stackIndex: number = this._formStack.length - 1) {
    let field = this._formStack[stackIndex];

    if (field?.fieldGroup && field.id && this._selectionIndexInfoMap[field.id] !== undefined) {
      let index = this._selectionIndexInfoMap[field.id] + 1;

      for (let i = index; i < field.fieldGroup.length; i++) {
        if (!field.fieldGroup[i].hide) {
          this.changePage(i, field);

          return;
        }
      }

      this.incrementFormPage(stackIndex + 1);
    }
  }

  changePage(index: number, field: FormlyFieldConfig) {
    let nextPage = field.fieldGroup && field.fieldGroup[index];

    if (nextPage && field.id) {
      this.changePage$.next({ id: field.id, selectionIndex: index });
    }
  }
}
