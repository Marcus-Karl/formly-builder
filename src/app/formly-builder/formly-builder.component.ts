import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { FormlyJsonschema } from '@ngx-formly/core/json-schema';

import { ConvertModel, createBuilderFormState, jsonBuilderSchema } from './helpers/base.helper';

@Component({
  selector: 'formly-builder',
  templateUrl: './formly-builder.component.html',
  styleUrls: ['./formly-builder.component.scss']
})
export class FormlyBuilderComponent implements OnInit {

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
  'form': {
    'pages': [
      {
        'fields': [
          {
            'basic': {
              'type': 'text-input-field',
              'subType': 'text',
              'label': 'Whats up?'
            },
            'options': [],
            'extra': {},
            'edit': '',
            'advanced': {
              'hideExpression': [],
              'validationExpressions': []
            },
            '_order': 1,
            '_referenceId': '7e6df5d65783499dac9efbc79572b8f3',
            'category': 'free-response-field'
          },
          {
            'basic': {
              'type': 'select-dropdown-field',
              'label': 'What is your mood?'
            },
            'options': [
              {
                'value': 'happy',
                'label': 'Happy',
                '_order': 1,
                '_referenceId': 'b35961e1366c49528e1399949d3b2a1e'
              },
              {
                'value': 'meh',
                'label': 'Meh',
                '_order': 2,
                '_referenceId': 'b04f4522ffe54189bd0e42d50d063494'
              },
              {
                'value': 'sad',
                'label': 'Sad',
                '_order': 3,
                '_referenceId': '18ba459f8a224c029a299fbf93999a8e'
              }
            ],
            'extra': {},
            'edit': '',
            'advanced': {
              'hideExpression': [],
              'validationExpressions': []
            },
            '_order': 2,
            '_referenceId': 'd8b1177eff4c4703a56cfa74cef30e8a',
            'category': 'multiple-choice-field'
          }
        ],
        'settings': {
          'hideExpression': [],
          'pageLabel': 'How you\'re doing'
        },
        '_order': 1,
        '_referenceId': '7140fa2886b447259cab768fc2112427'
      },
      {
        'fields': [
          {
            'basic': {},
            'options': [],
            'extra': {},
            'edit': '<h1 style="text-align:center"><strong>About Us</strong></h1><p>We care about you!</p>',
            'advanced': {
              'hideExpression': [],
              'validationExpressions': []
            },
            '_order': 1,
            '_referenceId': '114a4c4d204a43a698fd14a2cf667ea8',
            'category': 'display-content-field'
          }
        ],
        'settings': {
          'hideExpression': [],
          'pageLabel': 'About Us'
        },
        '_order': 2,
        '_referenceId': '8f33a72acece46e9bab4428c33e48362'
      }
    ],
    'tokens': [],
    'settings': {
      'formType': 'tab-form',
      'formLabel': 'Some form name'
    }
  }
});
/* eslint-enable @typescript-eslint/naming-convention */
