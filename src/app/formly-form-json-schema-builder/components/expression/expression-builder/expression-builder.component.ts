import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FieldArrayType, FormlyFieldConfig } from '@ngx-formly/core';
import { Subject } from 'rxjs';

import { FunctionHelpers } from 'src/app/formly-form-json-schema-builder/helpers/base.helper';
import { HideRuleEditorComponent } from 'src/app/formly-form-json-schema-builder/modals/hide-rule-editor/hide-rule-editor.component';

@Component({
  selector: 'expression-builder',
  templateUrl: './expression-builder.component.html',
  styleUrls: ['./expression-builder.component.scss']
})
export class ExpressionBuilderComponent extends FieldArrayType {
  public showGraph: boolean;
  public updateGraph$: Subject<boolean>;
  public zoomToFit$: Subject<boolean>;

  constructor(private dialog: MatDialog) {
    super();

    this.showGraph = false;
    this.updateGraph$ = new Subject<boolean>();
    this.zoomToFit$ = new Subject<boolean>();
  }

  add(i?: number, initialModel?: any, markAsDirty?: any) {
    if (this.options?.updateInitialValue) {
      this.options.updateInitialValue();
    }

    let index: number = (i === undefined || i === null) ? this.field.fieldGroup?.length || 0 : i;

    super.add(index, initialModel, markAsDirty);

    if (this.field?.fieldGroup && this.field.fieldGroup[index]) {
      let newField = this.field.fieldGroup[index];

      newField.model['_referenceId'] = FunctionHelpers.generateId();

      this.edit(newField);
    }
  }

  edit(formField: FormlyFieldConfig) {
    this.dialog.open(HideRuleEditorComponent, {
      data: formField,
      disableClose: true,
      maxWidth: '100vw',
      maxHeight: '100vh',
      panelClass: 'resizable-overlay'
    }).afterClosed();
  }
}
