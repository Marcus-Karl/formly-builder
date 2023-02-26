import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { FormlyJsonschema } from '@ngx-formly/core/json-schema';
import { JSONSchema7 } from 'json-schema';
import { firstValueFrom } from 'rxjs';

import { ConvertModel } from '../builder';
import { FunctionReferences } from '../builder/state-functions';
import { BuilderFormState, FormBuilderSelectionOption, PagesInformation, SelectionOptionType } from '../models/builder-form-state';
import { getDefaultSelectionOptionsMap, sortSelectionOptions } from '../models/default-selection-options';

@Injectable()
export class FormlyFormJsonSchemaBuilderService {

  private _fields?: FormlyFieldConfig[] = [];
  private _form: UntypedFormGroup = new UntypedFormGroup({});
  private _generatedSchemaConfig: { [key: string]: any } = {};
  private _model?: { [key: string]: any };
  private _options?: FormlyFormOptions;
  private _formlyFromJsonSchema?: any;
  private _initComplete = false;

  get builderSchema() {
    return this._formlyFromJsonSchema ?? {};
  }

  get generatedSchemaConfig() {
    return this._generatedSchemaConfig;
  }

  get fields() {
    return this._fields ?? [];
  }

  get form() {
    return this._form;
  }

  get isInited() {
    return this._initComplete ?? false;
  }

  get model() {
    return this._model ?? {};
  }

  set model(model: any) {
    this._model = model ?? {};
  }

  get options() {
    return this._options ?? {};
  }

  set options(options: FormlyFormOptions) {
    this._options = options ?? {};
  }

  constructor(private formlyJsonschema: FormlyJsonschema, private httpClient: HttpClient) {
    this.init().finally();
  }

  public async init(selectionOptionsMap?: { [key in SelectionOptionType]: FormBuilderSelectionOption[] }) {
    this._model = {};
    this._form = new UntypedFormGroup({});

    try {
      this._options = {
        ...this._options,
        formState: this._createBuilderFormState(this.model)
      }

      this._buildSelectionOptionsMap(this._options.formState.builder.options, selectionOptionsMap);

      this._formlyFromJsonSchema = await this.getDefaultSchema();

      this._fields = [this.formlyJsonschema.toFieldConfig(this._formlyFromJsonSchema as JSONSchema7)];
    } catch (err) {
      console.error(`Error building config`, err);
    }

    this._initComplete = true;
  }

  public getGeneratedSchema() {
    return ConvertModel.toJsonSchema(this.model, this.options.formState, this.generatedSchemaConfig);
  }

  private _createBuilderFormState = (model: any = {}): BuilderFormState => {
    let formState: BuilderFormState = {
      builder: {
        functions: {} as FunctionReferences,
        options: {} as { [key in SelectionOptionType]: FormBuilderSelectionOption[] },
        pagesInformation: {} as PagesInformation
      },
      mainModel: model
    };

    formState.builder.functions = new FunctionReferences(formState);

    return formState;
  }

  private _buildSelectionOptionsMap(options: { [key: string]: FormBuilderSelectionOption[] }, selectionOptionsMap?: { [key in SelectionOptionType]: FormBuilderSelectionOption[] }) {
    const optionsMap = Object.assign({}, getDefaultSelectionOptionsMap());

    if (selectionOptionsMap) {
      Object.assign(optionsMap, selectionOptionsMap);
    }

    Object.assign(options, optionsMap);
    Object.values(options).forEach(option => sortSelectionOptions(option));

    return options;
  }

  private async getDefaultSchema() {
    const schema = await firstValueFrom(this.loadSchema('builder-schema.json'))

    return schema;
  }

  private loadSchema(url: string) {
    return this.httpClient.get<JSONSchema7>(`/assets/schemas/${url}`);
  }
}
