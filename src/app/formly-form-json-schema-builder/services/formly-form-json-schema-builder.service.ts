import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { FormlyJsonschema } from '@ngx-formly/core/json-schema';
import { Resolver } from '@stoplight/json-ref-resolver';
import { JSONSchema7 } from 'json-schema';
import { ConvertModel } from '../builder';
import { FunctionReferences } from '../builder/state-functions';
import { BuilderFormState, FormBuilderSelectionOption, PagesInformation, SelectionOptionType } from '../models/builder-form-state';
import { getDefaultSelectionOptionsMap } from '../models/default-selection-options';

@Injectable({ providedIn: 'root' })
export class FormlyFormJsonSchemaBuilderService {

  private _fields?: FormlyFieldConfig[] = [];
  private _form: FormGroup = new FormGroup({});
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

  get options() {
    return this._options ?? {};
  }

  constructor(private formlyJsonschema: FormlyJsonschema, private httpClient: HttpClient) {
    this.init().finally(() => { });
  }

  public async init(selectionOptionsMap?: { [key in SelectionOptionType]: FormBuilderSelectionOption[] }) {
    this._model = getModel();
    this._form = new FormGroup({});

    try {
      this._options = {
        ...this._options,
        formState: this._createBuilderFormState(this.model)
      }

      this._buildSelectionOptionsMap(this._options.formState.builder.options, selectionOptionsMap);

      this._formlyFromJsonSchema = await this.getDefaultSchema();

      console.log(this._formlyFromJsonSchema);

      this._fields = [this.formlyJsonschema.toFieldConfig(this._formlyFromJsonSchema as JSONSchema7)];
    } catch (e) {
      console.error(`error building config`, e);
    }

    this._initComplete = true;
  }

  public getGeneratedSchema() {
    return ConvertModel.toJsonSchema(this.model, this.options.formState, this.generatedSchemaConfig);
  }

  private _createBuilderFormState = (mainModel: any = {}): BuilderFormState => {
    let formState: BuilderFormState = {
      builder: {
        functions: {} as FunctionReferences,
        options: {} as { [key in SelectionOptionType]: FormBuilderSelectionOption[] },
        pagesInformation: {} as PagesInformation
      },
      mainModel: mainModel
    };

    formState.builder.functions = new FunctionReferences(formState);

    return formState;
  }

  private _buildSelectionOptionsMap(options: { [key: string]: FormBuilderSelectionOption[] }, selectionOptionsMap?: { [key in SelectionOptionType]: FormBuilderSelectionOption[] }) {
    let optionsMap = Object.assign({}, getDefaultSelectionOptionsMap());

    if (selectionOptionsMap) {
      Object.assign(optionsMap, selectionOptionsMap);
    }

    Object.assign(options, optionsMap);

    return optionsMap;
  }

  private async getDefaultSchema() {
    let rootSchema = await this.loadSchema('json-schema-builder.schema.json').toPromise();

    let resolver = new Resolver({
      resolvers: {
        http: {
          resolve: async (ref: URI, ctx: any) => this.loadSchema(String(ref)).toPromise()
        },
        https: {
          resolve: async (ref: URI, ctx: any) => this.loadSchema(String(ref)).toPromise()
        },
        file: {
          resolve: async (ref: URI, ctx: any) => this.loadSchema(String(ref)).toPromise()
        }
      }
    });

    let response = await resolver.resolve(rootSchema);

    if (response.errors?.length) {
      console.error(response.errors);

      return {} as JSONSchema7;
    }

    // Reparse the result to prevent the internal resolver from setting an array 'items' property as read only
    let schema = JSON.parse(JSON.stringify(response.result));

    return schema as JSONSchema7;
  }

  private loadSchema(url: string) {
    return this.httpClient.get<JSONSchema7>(`/assets/schemas/${url}`);
  }
}


/* eslint-disable @typescript-eslint/naming-convention */
const getModel = () => ({
  "form": {
    "pages": [
      {
        "_order": 1,
        "_referenceId": "c18df3776db84b1ca9c1cd5951b76ce6",
        "fields": [
          {
            "category": "display-content-field",
            "basic": {
              "name": "",
              "label": ""
            },
            "complexObject": [],
            "options": [],
            "extra": {
              "defaultValue": "",
              "placeholder": "",
              "hint": "",
              "help": ""
            },
            "edit": "<h1 style=\"text-align:center\"><strong>Welcome to the Form Creator</strong></h1><p>Please add as many pages and fields as you would like.</p>",
            "advanced": {
              "hideExpression": [],
              "validationExpressions": []
            },
            "_order": 1,
            "_referenceId": "l7846782253c949fcbb3035a273371db0",
            "preview": null
          }
        ],
        "settings": {
          "name": "",
          "label": "Welcome Page",
          "hideExpression": []
        }
      },
      {
        "_order": 2,
        "_referenceId": "p9067bba8936d4075bcb23f63fa333ee3",
        "fields": [
          {
            "category": "multiple-choice-field",
            "basic": {
              "type": "radio-button-field",
              "name": "",
              "label": "Select your mood"
            },
            "complexObject": [],
            "options": [
              {
                "value": "sad",
                "label": "Sad",
                "_order": 1,
                "_referenceId": "v5416e736bd054435935bc3795fbb6843"
              },
              {
                "value": "happy",
                "label": "Happy",
                "_order": 2,
                "_referenceId": "u0ea258e700ab4746bee9ec8168732a13"
              },
              {
                "value": "go_away",
                "label": "Go Away",
                "_order": 3,
                "_referenceId": "c2c37ae077374577afd77759dad52b62"
              }
            ],
            "extra": {
              "defaultValue": "happy",
              "placeholder": "",
              "hint": "",
              "help": ""
            },
            "edit": "",
            "advanced": {
              "hideExpression": [],
              "validationExpressions": []
            },
            "_order": 1,
            "_referenceId": "g11b149552537437684aa5c02d8a1d107"
          },
          {
            "category": "free-response-field",
            "basic": {
              "type": "text-input-field",
              "name": "",
              "label": "What is your name?"
            },
            "complexObject": [],
            "options": [],
            "extra": {
              "defaultValue": "",
              "placeholder": "",
              "hint": "",
              "help": ""
            },
            "edit": "",
            "advanced": {
              "hideExpression": [],
              "validationExpressions": []
            },
            "_order": 2,
            "_referenceId": "n283e6d579d224a1392fa26009ed15f19"
          },
          {
            "category": "free-response-field",
            "basic": {
              "type": "textbox-field",
              "name": "",
              "label": "What would you like to tell us?"
            },
            "complexObject": [],
            "options": [],
            "extra": {
              "defaultValue": "",
              "placeholder": "",
              "hint": "",
              "help": ""
            },
            "edit": "",
            "advanced": {
              "hideExpression": [],
              "validationExpressions": []
            },
            "_order": 3,
            "_referenceId": "q7b3dfa6a31654c9d83021e971200a94c"
          }
        ],
        "settings": {
          "name": "",
          "label": "About You",
          "hideExpression": []
        }
      }
    ],
    "tokens": [],
    "settings": {
      "type": "tab-form",
      "name": "",
      "label": "My Form Label"
    }
  }
});
/* eslint-enable @typescript-eslint/naming-convention */
