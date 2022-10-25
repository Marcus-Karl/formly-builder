import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Subscription } from 'rxjs';
import { FieldInformation, BuilderFormState, FormBuilderSelectionOption, SelectionOptionType } from '../../models/builder-form-state';

@Component({
  selector: 'hide-rule-editor',
  templateUrl: './hide-rule-editor.component.html',
  styleUrls: ['./hide-rule-editor.component.scss']
})
export class HideRuleEditorComponent implements AfterViewInit, OnDestroy {
  @ViewChild('emptyAnchor') emptyAnchor: ElementRef<HTMLDivElement> | undefined;
  public cdkContainer: HTMLElement | undefined;

  public source: FormlyFieldConfig | undefined;
  public operator: FormlyFieldConfig | undefined;
  public against: FormlyFieldConfig | undefined;

  public isFullScreen = false;;
  public label = '';

  private _savedDialogHeight = '';
  private _savedDialogWidth = '';
  private _subscriptions: Subscription[] = [];
  private _sourceSelectionSubscription: Subscription | undefined;
  private _sourceSelection: FormBuilderSelectionOption | FieldInformation | undefined;
  private _fieldInformation: FieldInformation[] = [];

  constructor(public dialogRef: MatDialogRef<HideRuleEditorComponent>, @Inject(MAT_DIALOG_DATA) public field: FormlyFieldConfig) {
    if (this.field.options?.formState) {
      (this.field.options.formState as BuilderFormState).builder.functions.refreshPagesInformation();

      this._fieldInformation = (this.field.options.formState as BuilderFormState).builder.functions.getAllFieldInformation() || [];
    }

    this._setFields();
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

    this.source = this.field.fieldGroup.find(x => x.key === 'source');
    this.operator = this.field.fieldGroup.find(x => x.key === 'operator');
    this.against = this.field.fieldGroup.find(x => x.key === 'against');

    if (this.operator?.formControl) {
      this._subscriptions.push(
        this.operator.formControl.valueChanges.subscribe(value => {
          if (this.operator?.templateOptions && Array.isArray(this.operator?.templateOptions?.options)) {
            this.label = this.operator.templateOptions.options.find((x: FormBuilderSelectionOption) => x.value === value)?.label || '';
          }
        })
      );
    }

    if (this.source?.formControl) {
      this.source.formControl.statusChanges.subscribe(() => {
        if (this.source?.formControl?.valid) {
          this.operator?.formControl?.enable();
          this.against?.formControl?.enable();
        } else {
          this.operator?.formControl?.disable();
          this.against?.formControl?.disable();
        }
      });

      // Set initial state
      if (this.source?.formControl?.valid) {
        this.operator?.formControl?.enable();
        this.against?.formControl?.enable();
      } else {
        this.operator?.formControl?.disable();
        this.against?.formControl?.disable();
      }
    }

    this._setComparisonSubscriptions(this.source, true);
    this._setComparisonSubscriptions(this.against);
  }

  private _setComparisonSubscriptions(field: FormlyFieldConfig | undefined, isSource: boolean = false) {
    if (!field?.fieldGroup?.length) {
      return;
    }

    let selection = field.fieldGroup.find(x => x.key === 'selection');

    if (!selection?.formControl) {
      return;
    }

    this._subscriptions.push(
      selection.formControl.valueChanges.subscribe(value => {
        this._setNestedFieldOptions(field, value, isSource);
      })
    );
  }

  private _setNestedFieldOptions(field: FormlyFieldConfig | undefined, value: string, isSource: boolean) {
    if (!this.field.options?.formState) {
      return;
    }

    let selections: FormBuilderSelectionOption[];

    if (isSource) {
      selections = (this.field.options.formState as BuilderFormState).builder.options[SelectionOptionType.HideComparisonSource] || [];
    } else {
      selections = (this.field.options.formState as BuilderFormState).builder.options[SelectionOptionType.HideComparisonAgainst] || [];
    }

    let choice = selections.find(x => x.value === value)?.category;

    let optionsField = this._setOptionsToField(field, choice, isSource);

    if (isSource) {
      if (this._sourceSelectionSubscription) {
        this._sourceSelectionSubscription.unsubscribe();
      }

      if (optionsField) {
        this._monitorSourceSelectionChanges(optionsField);
      }
    }
  }

  private _setOptionsToField(field: FormlyFieldConfig | undefined, choice: any, isSource: boolean): FormlyFieldConfig | undefined {
    let optionsField = field?.fieldGroup?.find(x => x.key === choice);

    if (!optionsField?.templateOptions || !this.field.options) {
      return;
    }

    let isChoiceArray = Array.isArray(choice);
    let options: FieldInformation[] = [];

    if (isChoiceArray ? choice.includes('field') : choice === 'field') {
      let displayFieldsToRemove = (this.field.options.formState as BuilderFormState).builder.options[SelectionOptionType.FieldCategory]?.filter(x => x.category === 'display') || [];

      options.push(...this._fieldInformation.filter(x => !displayFieldsToRemove.find(dftr => dftr.value === x.category)));
    }

    if (!isSource && (isChoiceArray ? choice.includes('options') : choice === 'options')) {
      let selectedField = this._fieldInformation.find(x => x.value === this.source?.model?.selection);

      if (selectedField) {
        // Add change detection and validation to optionsField validation
        // Maybe make it a unique validation at the Formly Builder level?
        // selectedField.referenceId
      }
    }

    optionsField.templateOptions['_options'] = options;
    optionsField.templateOptions['options'] = options;

    return optionsField;
  }

  private _monitorSourceSelectionChanges(optionsField: FormlyFieldConfig) {
    if (!optionsField.formControl || !optionsField.templateOptions || !Array.isArray(optionsField.templateOptions?._options)) {
      return;
    }

    let options = optionsField.templateOptions._options;

    this._sourceSelectionSubscription = optionsField.formControl.valueChanges.subscribe((value: string) => {
      let sourceSelection = options.find(x => x.value === value) as FieldInformation;

      this._setOperators(sourceSelection);
    });
  }

  private _setOperators(sourceSelection: FieldInformation) {
    if (!sourceSelection || !this.operator?.templateOptions || !this.field.options?.formState) {
      return;
    }

    let availableOperators = (this.field.options.formState as BuilderFormState).builder.options[SelectionOptionType.ComparisonOperator].filter(operator => {
      if (Array.isArray(operator.category)) {
        return operator.category.includes(sourceSelection.type) || operator.category.includes(sourceSelection.category);
      }

      return operator.category === sourceSelection.type || operator.category === sourceSelection.category;
    });

    this.operator.templateOptions['_options'] = availableOperators;
    this.operator.templateOptions['options'] = availableOperators;
  }

  private _setAgainstSelection(sourceSelection: FieldInformation) {

  }
}
