import { AfterViewInit, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormlyFieldConfig } from '@ngx-formly/core';

import { SelectionOption } from '../../helpers/builder-selection-options.helper';
import { BuilderFormState } from '../../helpers/form-state.helper';

@Component({
  selector: 'rule-editor',
  templateUrl: './rule-editor.component.html',
  styleUrls: ['./rule-editor.component.scss']
})
export class RuleEditorComponent implements AfterViewInit {
  @ViewChild('emptyAnchor') emptyAnchor: ElementRef<HTMLDivElement> | undefined;
  public cdkContainer: HTMLElement | undefined;

  public leftHandSide: FormlyFieldConfig | undefined;
  public operator: FormlyFieldConfig | undefined;
  public rightHandSide: FormlyFieldConfig | undefined;

  public isFullScreen: boolean;
  public label = '';
  public leftSideComparisonAgainst = '';

  private _savedDialogHeight = '';
  private _savedDialogWidth = '';

  constructor(public dialogRef: MatDialogRef<RuleEditorComponent>, @Inject(MAT_DIALOG_DATA) public field: FormlyFieldConfig) {
    this.isFullScreen = false;

    this._setFields();

    if (this.field.options?.formState) {
      (this.field.options.formState as BuilderFormState).builder.functions.refreshPagesInformation();
    }
  }

  ngAfterViewInit() {
    if (this.emptyAnchor?.nativeElement?.parentElement?.parentElement) {
      this.cdkContainer = this.emptyAnchor.nativeElement.parentElement.parentElement;
    }
  }

  resetAndClose() {
    if (this.field.options?.resetModel) {
      this.field.options.resetModel();
    }

    this.dialogRef.close();
  }

  updateAndClose() {
    if (this.field.options?.updateInitialValue) {
      this.field.options.updateInitialValue();
    }

    this.dialogRef.close();
  }

  toggleSize() {
    if (!this.cdkContainer?.parentElement) {
      return;
    }

    if (this.isFullScreen) {
      this.cdkContainer.style.width = this._savedDialogWidth;
      this.cdkContainer.style.height = this._savedDialogHeight;
    } else {
      this._savedDialogWidth = this.cdkContainer.style.width;
      this._savedDialogHeight = this.cdkContainer.style.height;

      this.cdkContainer.style.width = '100vw';
      this.cdkContainer.style.height = '100vh';
    }

    let style = this.cdkContainer.parentElement.style as any;
    style.transform = null;

    this.isFullScreen = !this.isFullScreen;
  }

  private _setFields() {
    if (!this.field.fieldGroup?.length) {
      return;
    }

    this.leftHandSide = this.field.fieldGroup.find(x => x.key === 'leftHandSide');
    this.operator = this.field.fieldGroup.find(x => x.key === 'operator');
    this.rightHandSide = this.field.fieldGroup.find(x => x.key === 'rightHandSide');

    this.operator?.formControl?.valueChanges.subscribe(value => {
      this.label = (this.operator?.templateOptions?.options as any[])?.find(x => x.value === value)?.label;
    });

    if (!this.leftHandSide?.fieldGroup?.length) {
      return;
    }

    let comparisonAgainst = this.leftHandSide.fieldGroup.find(x => x.key === 'comparisonAgainst');

    if (!comparisonAgainst?.formControl) {
      return;
    }

    if (comparisonAgainst.templateOptions && Array.isArray(comparisonAgainst.templateOptions.options)) {
      comparisonAgainst.templateOptions.options = comparisonAgainst.templateOptions.options.filter((x: SelectionOption) => ['thisItemValue', 'differentFieldAnswer', 'token'].includes(x.value));
    }

    this.leftSideComparisonAgainst = this.leftHandSide.model?.comparisonAgainst;

    comparisonAgainst.formControl.valueChanges.subscribe(value => {
      if (this.leftSideComparisonAgainst !== value && this.leftHandSide?.fieldGroup?.length) {
        if (value === 'differentFieldAnswer') {
          let differentFieldAnswer = this.leftHandSide.fieldGroup.find(x => x.key === 'differentFieldAnswer');

          if (differentFieldAnswer?.templateOptions && this.field.options?.formState) {
            let options = (this.field.options.formState as BuilderFormState).builder.functions.getAllFieldInformation();

            differentFieldAnswer.templateOptions['options'] = options.filter(x => x.category !== 'display-content-field');
          }
        } else if (value === 'token') {
          let tokenField = this.leftHandSide.fieldGroup.find(x => x.key === 'token');

          if (tokenField?.templateOptions && tokenField.options?.formState) {
            tokenField.templateOptions['options'] = (tokenField.options.formState as BuilderFormState).builder.functions.getAllFieldInformation();
          }
        }
      }

      this.leftSideComparisonAgainst = value;
    });
  }
}
