import { Component, EventEmitter, Output } from '@angular/core';
import { FormlyFormJsonSchemaBuilderService } from './services/formly-form-json-schema-builder.service';

@Component({
  selector: 'app-formly-form-json-schema-builder',
  templateUrl: './formly-form-json-schema-builder.component.html',
  styleUrls: ['./formly-form-json-schema-builder.component.scss']
})
export class FormlyFormJsonSchemaBuilderComponent {
  @Output() onDone = new EventEmitter();

  public schemaDef: any;

  constructor(public jsbs: FormlyFormJsonSchemaBuilderService) { }

  onSubmit() {
    console.log(`Called onSubmit!`);
    console.log(JSON.stringify(this.jsbs.model));
    console.log(this.jsbs.model);
    console.warn('Building schema!');

    let schema = this.jsbs.getGeneratedSchema();

    console.log(schema);

    this.schemaDef = JSON.stringify(schema, null, 2);

    this.onDone.emit();
  }
}
