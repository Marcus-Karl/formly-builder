import { Component, OnInit } from '@angular/core'
import { FieldWrapper } from '@ngx-formly/core';
import { BuilderFormState, SelectionOptionType } from '../../models/builder-form-state';

@Component({
  selector: 'app-preconfigured-schema-fields',
  template: `<ng-container #fieldComponent></ng-container>`,
  styles: [``]
})
export class PreconfiguredSchemaFieldsComponent extends FieldWrapper implements OnInit {

  ngOnInit() {
    const parentModel = this.field.parent?.model;
    const builderFormState: BuilderFormState = this.field.options?.formState;
    const options = builderFormState?.builder.options[parentModel?.basic?.subType ? SelectionOptionType.FieldSubType : SelectionOptionType.FieldType];
    const builderSchemaDefaults = options?.find((x: any) => x.value === parentModel?.basic?.type)?.builderSchemaDefaults ?? {};

    this.props.objectSchema = builderSchemaDefaults.objectSchema;
  }
}
