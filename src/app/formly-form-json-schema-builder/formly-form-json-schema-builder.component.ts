import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { FormlyJsonschema } from '@ngx-formly/core/json-schema';

import { ConvertModel, createBuilderFormState, jsonBuilderSchema } from './builder-functions';

@Component({
  selector: 'app-formly-form-json-schema-builder',
  templateUrl: './formly-form-json-schema-builder.component.html',
  styleUrls: ['./formly-form-json-schema-builder.component.scss']
})
export class FormlyFormJsonSchemaBuilderComponent implements OnInit {

  public isFormLoading: boolean;
  public schemaDef: any;

  public fields: FormlyFieldConfig[];
  public form: FormGroup;
  public model: { [key: string]: any } = {};
  public options: FormlyFormOptions;

  constructor(private formlyJsonschema: FormlyJsonschema) {
    this.isFormLoading = true;
    this.form = new FormGroup({});

    this.model = getModel();

    this.options = {
      formState: createBuilderFormState(this.model)
    };

    let json = jsonBuilderSchema(this.options.formState);

    let field = this.formlyJsonschema.toFieldConfig(json as any);

    this.fields = [field];
  }

  ngOnInit(): void {
    this.isFormLoading = false;
  }

  onSubmit(model: any) {
    console.log(`Called onSubmit!`);
    console.log(JSON.stringify(model));
    console.log(model);
    console.warn('Building schema!');

    let schema = ConvertModel.toJsonSchema(model);

    console.log(schema);

    this.schemaDef = JSON.stringify(schema, null, 2);
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
      "formType": "tab-form",
      "name": "",
      "label": "My Form Label"
    }
  }
});
/* eslint-enable @typescript-eslint/naming-convention */
