import { Component } from '@angular/core';
import { FormlyFormJsonSchemaBuilderService } from './services/formly-form-json-schema-builder.service';

@Component({
  selector: 'formly-form-json-schema-builder',
  templateUrl: './formly-form-json-schema-builder.component.html',
  styleUrls: ['./formly-form-json-schema-builder.component.scss'],
  providers: [
    FormlyFormJsonSchemaBuilderService
  ]
})
export class FormlyFormJsonSchemaBuilderComponent {
  public schemaDef: any;

  constructor(public jsbs: FormlyFormJsonSchemaBuilderService) {}

  onSubmit() {
    console.log('Model', JSON.stringify(this.jsbs.model), this.jsbs.model);

    console.warn('Building schema!');

    const schema = this.jsbs.getGeneratedSchema();

    console.log('Schema', schema);

    this.schemaDef = JSON.stringify(schema, null, 2);
  }
}