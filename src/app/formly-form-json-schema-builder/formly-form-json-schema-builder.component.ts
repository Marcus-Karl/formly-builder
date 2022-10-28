import { Component, EventEmitter, Output } from '@angular/core';
import { ConvertJsonSchema } from './builder/json-schema-to-model-builder';
import { FormlyFormJsonSchemaBuilderService } from './services/formly-form-json-schema-builder.service';

@Component({
  selector: 'app-formly-form-json-schema-builder',
  templateUrl: './formly-form-json-schema-builder.component.html',
  styleUrls: ['./formly-form-json-schema-builder.component.scss'],
  providers: [
    FormlyFormJsonSchemaBuilderService
  ]
})
export class FormlyFormJsonSchemaBuilderComponent {
  @Output() onDone = new EventEmitter();

  public schemaDef: any;

  constructor(public jsbs: FormlyFormJsonSchemaBuilderService) {
    const schema = ConvertJsonSchema.toModel(jsonSchema as any, this.jsbs.options.formState);

    console.log(`Schema`, schema);
  }

  onSubmit() {
    console.log(`Called onSubmit!`);
    console.log(JSON.stringify(this.jsbs.model));
    console.log(this.jsbs.model);
    console.warn('Building schema!');

    const schema = this.jsbs.getGeneratedSchema();

    console.log(schema);

    this.schemaDef = JSON.stringify(schema, null, 2);

    this.onDone.emit();
  }
}

const jsonSchema = {
  type: 'object',
  properties: {
    type: {
      type: 'object',
      widget: {
        formlyConfig: {
          expressions: {
            hide: true
          }
        }
      },
      properties: {
        id: {
          type: 'string'
        },
        description: {
          type: 'string'
        },
        baseType: {
          type: 'string'
        }
      },
      required: [
        'id',
        'description'
      ]
    },
    agency: {
      type: 'object',
      fieldType: 'agency',
      widget: {
        formlyConfig: {
          expressions: {
            hide: true
          }
        }
      },
      properties: {
        id: {
          type: 'string'
        },
        name: {
          type: 'string'
        },
        timezone: {
          type: 'string'
        },
        county: {
          type: 'object',
          properties: {
            id: {
              type: 'string'
            },
            description: {
              type: 'string'
            }
          },
          required: [
            'id',
            'description'
          ]
        }
      },
      required: [
        'id',
        'name',
        'county'
      ]
    },
    documentId: {
      type: 'string',
      widget: {
        formlyConfig: {
          expressions: {
            hide: true
          }
        }
      }
    },
    court: {
      type: 'object',
      fieldType: 'court',
      widget: {
        formlyConfig: {
          expressions: {
            hide: true
          }
        }
      },
      properties: {
        id: {
          type: 'string'
        },
        name: {
          type: 'string'
        },
        timezone: {
          type: 'string'
        },
        county: {
          type: 'object',
          properties: {
            id: {
              type: 'string'
            },
            description: {
              type: 'string'
            }
          },
          required: [
            'id',
            'description'
          ]
        }
      },
      required: [
        'id',
        'name',
        'county'
      ]
    }
  }
};