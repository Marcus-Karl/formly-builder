import { Component, OnInit } from '@angular/core';
import { FieldArrayType, FormlyFieldConfig } from '@ngx-formly/core';
import { FunctionHelpers } from 'src/app/formly-form-json-schema-builder/builder-functions';

@Component({
  selector: 'operator-condition',
  templateUrl: './operator-condition.component.html',
  styleUrls: ['./operator-condition.component.scss']
})
export class OperatorConditionComponent extends FieldArrayType implements OnInit {

  public leftHandSide: FormlyFieldConfig | undefined;
  public operator: FormlyFieldConfig | undefined;
  public rightHandSide: FormlyFieldConfig | undefined;

  ngOnInit() {
    this._setFields();
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

    this._setFields();
  }

  private _setFields() {
    if (this.field.fieldGroup?.length) {
      this.leftHandSide = this.field.fieldGroup[0].fieldGroup?.find(x => x.key === 'leftHandSide');
      this.operator = this.field.fieldGroup[0].fieldGroup?.find(x => x.key === 'operator');
      this.rightHandSide = this.field.fieldGroup[0].fieldGroup?.find(x => x.key === 'rightHandSide');
    }
  }
}
