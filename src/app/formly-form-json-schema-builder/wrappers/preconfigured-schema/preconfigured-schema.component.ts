import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { FieldWrapper, FormlyFieldConfig } from '@ngx-formly/core';
import { Subscription } from 'rxjs';
import { BuilderFormState, FormBuilderSelectionOption, SelectionOptionType } from '../../models/builder-form-state';

@Component({
  selector: 'preconfigured-schema',
  template: `<ng-container #fieldComponent></ng-container>`,
  styles: [``]
})
export class PreconfiguredSchemaComponent extends FieldWrapper implements OnDestroy, OnInit {

  private _subscription?: Subscription;

  ngOnInit() {
    const basicFields = this.field.fieldGroup?.find(x => x.key === 'basic');
    const objectSchema = this.field.fieldGroup?.find(x => x.key === 'objectSchema');
    const typeField = basicFields?.fieldGroup?.find(x => x.key === 'type');
    const subTypeField = basicFields?.fieldGroup?.find(x => x.key === 'subType');

    this._subscription = this.field.options?.fieldChanges?.subscribe(change => {
      if (change.type !== 'valueChanges') {
        return;
      }

      if (change.field === objectSchema) {
        if (change.value?.length && (typeField?.formControl?.enabled || subTypeField?.formControl?.enabled)) {
          typeField?.formControl?.disable();
          subTypeField?.formControl?.disable();
        } else if (!change.value?.length) {
          this._enableApplicableFields(basicFields);
        }
      }

      if (change.field === typeField) {
        subTypeField && this.options.checkExpressions?.(subTypeField);

        this._enableApplicableFields(basicFields);

        if (!subTypeField || subTypeField?.hide) {
          const builderFormState: BuilderFormState = this.field.options?.formState;
          const options = builderFormState?.builder.options[SelectionOptionType.FieldType];

          this._disableApplicableFields(options, change.value, basicFields?.fieldGroup);
        }
      }

      if (change.field === subTypeField) {
        this._enableApplicableFields(basicFields);

        const builderFormState: BuilderFormState = this.field.options?.formState;
        const options = builderFormState?.builder.options[SelectionOptionType.FieldSubType];

        this._disableApplicableFields(options, change.value, basicFields?.fieldGroup);
      }
    });
  }

  ngOnDestroy() {
    this._subscription?.unsubscribe?.();
  }

  private _enableApplicableFields(basicFields?: FormlyFieldConfig) {
    Object.values((basicFields?.formControl as UntypedFormGroup).controls ?? {}).forEach(control => {
      if (control.disabled) {
        control.enable();
      }
    });
  }

  private _disableApplicableFields(options: FormBuilderSelectionOption[], type: string, fieldGroup?: FormlyFieldConfig[]) {
    const builderSchemaDefaults = options?.find((x: any) => x.value === type)?.builderSchemaDefaults;

    Object.entries(builderSchemaDefaults?.basic ?? {}).forEach(([key, value]) => {
      const field = fieldGroup?.find(x => x.key === key);
      field?.formControl?.patchValue(value);

      if (value) {
        field?.formControl?.disable();
      }
    });
  }
}
