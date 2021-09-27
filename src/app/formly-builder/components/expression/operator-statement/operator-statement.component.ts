import { Component, OnInit } from '@angular/core';
import { FieldArrayType, FormlyFieldConfig } from '@ngx-formly/core';
import { FunctionHelpers } from 'src/app/formly-builder/helpers/base.helper';

@Component({
  selector: 'operator-statement',
  templateUrl: './operator-statement.component.html',
  styleUrls: ['./operator-statement.component.scss']
})
export class OperatorStatementComponent extends FieldArrayType implements OnInit {

  public leftHandSide: FormlyFieldConfig | undefined;
  public operator: FormlyFieldConfig | undefined;
  public rightHandSide: FormlyFieldConfig | undefined;

  ngOnInit() {
    this._setStatementFields();
  }

  add(i?: number, initialModel?: any, markAsDirty?: any) {
    if (this.options?.updateInitialValue) {
      this.options.updateInitialValue();
    }

    let index = (i === undefined || i === null) ? this.field.fieldGroup?.length || 0 : i;

    if (index > 0) {
      return;
    }

    super.add(index, initialModel, markAsDirty);

    if (this.field?.fieldGroup && this.field.fieldGroup[index]) {
      let newField = this.field.fieldGroup[index];

      newField.model['_referenceId'] = FunctionHelpers.generateId();
    }

    this._setStatementFields();
  }

  private _setStatementFields() {
    if (this.field.fieldGroup && this.field.fieldGroup?.length > 0) {
      this.leftHandSide = this.field.fieldGroup[0].fieldGroup?.find(x => x.key === 'leftHandSide');
      this.operator = this.field.fieldGroup[0].fieldGroup?.find(x => x.key === 'operator');
      this.rightHandSide = this.field.fieldGroup[0].fieldGroup?.find(x => x.key === 'rightHandSide');
    }
  }
}
