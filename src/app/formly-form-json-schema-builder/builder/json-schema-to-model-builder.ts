import { JSONSchema7 } from 'json-schema';
import { BuilderFormState, SelectionOptionType } from '../models/builder-form-state';


export class ConvertJsonSchema {

  private _config: any;
  private _formState: BuilderFormState;

  constructor(formState: BuilderFormState, config?: any) {
    this._formState = formState;
    this._config = config;
  }

  public static toModel(schema: JSONSchema7, formState: BuilderFormState, config: any = {}) {
    if (!schema) {
      return null;
    }

    const model = {
      form: {
        pages: [],
        settings: {
          ...(schema as any)?.widget?.formlyConfig?.type && { type: (schema as any)?.widget?.formlyConfig?.type },
          ...(schema.description || schema.title) && { label: (schema.description || schema.title) },
        }
      }
    };

    const convertJsonSchema = new ConvertJsonSchema(formState, config);

    for (const [key, value] of Object.entries((schema.properties ?? {}) as { [key: string]: JSONSchema7 })) {
      convertJsonSchema.getNextStep(model.form.pages, value, key);
    }

    return model;
  }


  /**
   * STEPPER
   */
  private getNextStep = (model: any, schema: JSONSchema7, key: string) => {
    if (!schema?.type) {
      const message = `Schema type is not defined.`;
      console.error(message, schema);
      throw new Error(message);
    } else if (Array.isArray(schema.type)) {
      const message = `Unsupported schema type (array).`;
      console.error(message, schema);
      throw new Error(message);
    }

    switch (schema.type) {
      case 'object':
        this.getObjectModel(model, schema, key);
        break;
      case 'array':
        this.getObjectModel(model, schema, key);
        break;
      case 'string':
      case 'number':
      case 'boolean':
      case 'integer':
        this.getDefaultModel(model, schema, key);
        break;
      case 'null':
      default:
        this.getNullModel(model, schema, key);
        break;
    }
  }


  /**
   * SECTION BUILDER
   */
  private getObjectModel = (model: any, schema: JSONSchema7, key: string) => {
    if (schema.type === 'object' && !schema.properties) {
      console.error(`Schema of type [${schema.type}] does not have properties, skipping.`, schema);
      return;
    } else if (schema.type === 'array' && !schema.items) {
      console.error(`Schema of type [${schema.type}] does not have items, skipping.`, schema);
      return;
    }

    this.buildFromObject(model, schema, key);
  }

  private getDefaultModel = (model: any, schema: JSONSchema7, key: string) => {
    if (!Array.isArray(model)) {
      return;
    }

    this.buildFromField(model, schema, key);
  }

  private getNullModel = (model: any, schema: JSONSchema7, key: string) => {
    if (!Array.isArray(model)) {
      return;
    }

    this.buildFromField(model, schema, key);
  }


  /**
   * BUILDERS
   */
  private buildFromObject = (model: any, schema: JSONSchema7, key: string) => {
    if (!Array.isArray(model)) {
      return;
    }

    const formlyConfig = (schema as any)?.widget?.formlyConfig ?? {};
    const props = formlyConfig.props ?? formlyConfig.templateOptions ?? {};
    const type = formlyConfig.type ?? schema.type;

    const basic = {
      ...key && { name: key },
      ...schema.title && { label: schema.title },
      ...type && { type: type }
    };

    const extra = {
      ...(schema.default || formlyConfig.defaultValue) && { defaultValue: schema.default || formlyConfig.defaultValue },
      ...props.help && { help: props.help },
      ...props.hint && { hint: props.hint },
      ...props.placeholder && { placeholder: props.placeholder }
    };

    const field = {
      category: this._formState?.builder.options[SelectionOptionType.FieldType].find(x => x.value === type)?.category ?? 'unknown-complex-object-field',
      objectSchema: [],
      basic: basic,
      ...Object.keys(extra).length && { extra: extra}
    };

    model.push(field);

    if (schema.properties) {
      for (const [key, value] of Object.entries(schema.properties as { [key: string]: JSONSchema7 })) {
        this.getNextStep(field.objectSchema, value, key);
      }
    } else if (schema.items) {
      for (const [key, value] of Object.entries(schema.items as { [key: string]: JSONSchema7 })) {
        this.getNextStep(field.objectSchema, value, key);
      }
    }
  }

  private buildFromField = (model: any, schema: JSONSchema7, key: string) => {
    if (!Array.isArray(model)) {
      return;
    }

    const formlyConfig = (schema as any)?.widget?.formlyConfig ?? {};
    const props = formlyConfig.props ?? formlyConfig.templateOptions ?? {};
    const type = formlyConfig.type ?? schema.type;

    const basic = {
      ...key && { name: key },
      ...schema.title && { label: schema.title },
      ...type && { type: type }
    };

    const extra = {
      ...(schema.default || formlyConfig.defaultValue) && { defaultValue: schema.default || formlyConfig.defaultValue },
      ...props.help && { help: props.help },
      ...props.hint && { hint: props.hint },
      ...props.placeholder && { placeholder: props.placeholder }
    };

    const field = {
      category: this._formState?.builder.options[SelectionOptionType.FieldType].find(x => x.value === type)?.category ?? 'unknown-free-response-field',
      basic: basic,
      ...Object.keys(extra).length && { extra: extra}
    }

    model.push(field);
  }
}
