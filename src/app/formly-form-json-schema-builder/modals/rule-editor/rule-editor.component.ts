import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Subscription } from 'rxjs';

import { SelectionOption } from '../../builder-functions/base-schema-selection-options';
import { BuilderFormState } from '../../builder-functions/builder-form-state.models';

@Component({
  selector: 'rule-editor',
  templateUrl: './rule-editor.component.html',
  styleUrls: ['./rule-editor.component.scss']
})
export class RuleEditorComponent implements AfterViewInit, OnDestroy {
  @ViewChild('emptyAnchor') emptyAnchor: ElementRef<HTMLDivElement> | undefined;
  public cdkContainer: HTMLElement | undefined;

  public leftHandSide: FormlyFieldConfig | undefined;
  public operator: FormlyFieldConfig | undefined;
  public rightHandSide: FormlyFieldConfig | undefined;

  public isFullScreen: boolean;
  public label = '';
  public leftSideComparisonAgainst = '';
  public rightSideComparisonAgainst = '';

  private _savedDialogHeight = '';
  private _savedDialogWidth = '';
  private _subscriptions: Subscription[] = [];

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

  ngOnDestroy() {
    this._subscriptions.forEach(x => x.unsubscribe());
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

    if (this.operator?.formControl) {
      this._subscriptions.push(
        this.operator.formControl.valueChanges.subscribe(value => {
          if (this.operator?.templateOptions && Array.isArray(this.operator?.templateOptions?.options)) {
            this.label = this.operator.templateOptions.options.find((x: SelectionOption) => x.value === value)?.label || '';
          }
        })
      );
    }

    this._setComparisonSubscriptions(this.leftHandSide, true);
    this._setComparisonSubscriptions(this.rightHandSide);
  }

  private _setComparisonSubscriptions(field: FormlyFieldConfig | undefined, isLeftSide: boolean = false) {
    if (!field?.fieldGroup?.length) {
      return;
    }

    let comparisonAgainst = field.fieldGroup.find(x => x.key === 'comparisonAgainst');

    if (!comparisonAgainst?.formControl) {
      return;
    }

    if (comparisonAgainst.templateOptions && Array.isArray(comparisonAgainst.templateOptions.options)) {
      let comparisonTypes = ['differentFieldAnswer', 'token'];

      if (isLeftSide) {
        comparisonTypes.push('thisItemValue');
      } else {
        comparisonTypes.push('listOfItems', 'predefined');
      }

      comparisonAgainst.templateOptions.options = comparisonAgainst.templateOptions.options.filter((x: SelectionOption) => comparisonTypes.includes(x.value));
    }

    if (isLeftSide) {
      this.leftSideComparisonAgainst = field.model?.comparisonAgainst;
    } else {
      this.rightSideComparisonAgainst = field.model?.comparisonAgainst;
    }

    this._subscriptions.push(
      comparisonAgainst.formControl.valueChanges.subscribe(value => {
        let matches = (isLeftSide ? this.leftSideComparisonAgainst : this.rightSideComparisonAgainst) === value;

        if (!matches) {
          this._setNestedFieldOptions(field, value);
        }

        if (isLeftSide) {
          this.leftSideComparisonAgainst = value;
        } else {
          this.rightSideComparisonAgainst = value;
        }
      })
    );
  }

  private _setNestedFieldOptions(field: FormlyFieldConfig | undefined, value: string) {
    if (!field?.fieldGroup?.length) {
      return;
    }

    if (value === 'differentFieldAnswer') {
      let differentFieldAnswer = field.fieldGroup.find(x => x.key === 'differentFieldAnswer');

      if (differentFieldAnswer?.templateOptions && this.field.options?.formState) {
        let options = (this.field.options.formState as BuilderFormState).builder.functions.getAllFieldInformation();

        differentFieldAnswer.templateOptions['options'] = options.filter(x => x.category !== 'display-content-field');
      }
    } else if (value === 'token') {
      let tokenField = field.fieldGroup.find(x => x.key === 'token');

      if (tokenField?.templateOptions && tokenField.options?.formState) {
        tokenField.templateOptions['options'] = (tokenField.options.formState as BuilderFormState).builder.functions.getAllFieldInformation();
      }
    }
  }
}
