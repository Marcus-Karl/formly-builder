import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { FieldWrapper } from '@ngx-formly/core';
import { BuilderFormState, SelectionOptionType } from '../../models/builder-form-state';

@Component({
  selector: 'app-preconfigured-schema',
  template: '<ng-container #fieldComponent></ng-container>',
  styles: [``]
})
export class PreconfiguredSchemaComponent extends FieldWrapper implements OnInit {

  ngOnInit() {
    const basicFields = this.field.fieldGroup?.find(x => x.key === 'basic');
    const objectSchema = this.field.fieldGroup?.find(x => x.key === 'objectSchema');

    const typeField = basicFields?.fieldGroup?.find(x => x.key === 'type');
    const subTypeField = basicFields?.fieldGroup?.find(x => x.key === 'subType');

    if (typeField && subTypeField && objectSchema) {
      typeField.formControl?.valueChanges.subscribe(type => {
        this.options.checkExpressions?.(subTypeField);

        Object.values((basicFields?.formControl as UntypedFormGroup).controls ?? {}).forEach(control => {
          if (control.disabled) {
            control.enable();
          }
        });

        const builderFormState: BuilderFormState = this.field.options?.formState;

        if (subTypeField.hide) {
          const options = builderFormState?.builder.options[SelectionOptionType.FieldType];

          if (options) {
            const builderSchemaDefaults = options.find((x: any) => x.value === type)?.builderSchemaDefaults ?? {};

            Object.entries(builderSchemaDefaults.basic ?? {}).forEach(([key, value]) => {
              const field = basicFields?.fieldGroup?.find(x => x.key === key);
              field?.formControl?.patchValue(value);
              field?.formControl?.disable();
            });
          }
        } else {
          const options = builderFormState?.builder.options[SelectionOptionType.FieldSubType];

          if (options) {
            subTypeField?.formControl?.valueChanges.subscribe(subType => {
              const builderSchemaDefaults = options.find((x: any) => x.value === subType)?.builderSchemaDefaults ?? {};

              Object.entries(builderSchemaDefaults.basic ?? {}).forEach(([key, value]) => {
                const field = basicFields?.fieldGroup?.find(x => x.key === key);
                field?.formControl?.patchValue(value);
                field?.formControl?.disable();
              });
            });
          }
        }
      })
    }
  }
}
