import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FieldArrayType } from '@ngx-formly/core';
import { Subscription } from 'rxjs';

import { FieldEditorComponent } from 'src/app/formly-form-json-schema-builder/modals/field-editor/field-editor.component';
import { FunctionHelpers } from 'src/app/formly-form-json-schema-builder/builder';

@Component({
  selector: 'token-page',
  templateUrl: './token-page.component.html',
  styleUrls: ['./token-page.component.scss']
})
export class TokenPageComponent extends FieldArrayType {

  private _editSubscriptions: Subscription[];

  constructor(private dialog: MatDialog) {
    super();

    this._editSubscriptions = [];
  }

  add(i?: number, initialModel?: any, markAsDirty?: any) {
    let index = (i === undefined || i === null) ? this.field.fieldGroup?.length || 0 : i;

    super.add(index, initialModel, markAsDirty);

    if (this.field.fieldGroup && this.field.fieldGroup[index]) {
      let newField = this.field.fieldGroup[index];

      newField.model['_order'] = index + 1;
      newField.model['_referenceId'] = FunctionHelpers.generateId();

      this.edit(newField);
    }
  }

  edit(token: FormlyFieldConfig) {
    this._setTokenOptions(token);

    this.dialog.open(FieldEditorComponent, {
      data: token,
      disableClose: true,
      maxWidth: '100vw',
      maxHeight: '100vh',
      panelClass: 'resizable-overlay'
    }).afterClosed()
      .subscribe(() => {
        this._editSubscriptions.forEach(x => x.unsubscribe());
        this._editSubscriptions.length = 0;
      });
  }

  getConfiguredToken(token: FormlyFieldConfig) {
    try {
      if (!token?.model || !token?.options) {
        return null;
      }

      let f = token.model || {};
      let category = f.category as string;

      if (category) {
        category = (token.options.formState?.builder?.options.tokenCategories as any[])?.find(x => x.value === category)?.label || f.category;
      }

      let tokenType = f.basic?.tokenType;

      if (tokenType) {
        tokenType = (token.options.formState?.builder?.options.fieldTypes as any[])?.find(x => x.value === tokenType)?.label || f.basic?.tokenType;
      }

      let tokenSubType = f.basic?.tokenSubType;

      if (tokenSubType) {
        tokenSubType = (token.options.formState?.builder?.options.fieldSubTypes as any[])?.find(x => x.value === tokenSubType)?.label || f.basic?.tokenSubType;
      }

      return {
        name: f.basic?.tokenName,
        type: (tokenType || '') + (tokenSubType ? ' - ' + tokenSubType : ''),
        category: category,
      };
    } catch (e) {
      console.error('Error getting configured field.', ...this.model, e);
    }

    return null;
  }

  private _setTokenOptions(token: FormlyFieldConfig) {
    FunctionHelpers.refreshPagesInformation(this.options?.formState);

    let basicOptions = token.fieldGroup?.find(x => x.key === 'basic');

    if (basicOptions?.fieldGroup) {
      let fieldReference = basicOptions.fieldGroup.find(x => x.key === 'fieldReference');

      if (!fieldReference) {
        console.error(`Could not find token fieldReference`);

        return;
      }

      if (!fieldReference?.templateOptions) {
        fieldReference.templateOptions = {};
      }

      let selectableOptions = FunctionHelpers.getAllFieldInformation(this.options?.formState).filter(x => x.category !== 'display-content-field');

      fieldReference.templateOptions['options'] = selectableOptions;

      if (fieldReference.formControl?.value && !selectableOptions.find(x => x.referenceId === fieldReference?.formControl?.value)) {
        fieldReference.formControl.patchValue(null);
      }
    }
  }
}
