import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormBuilder, FormlyFormOptions } from '@ngx-formly/core';
import { FormlyJsonschema } from '@ngx-formly/core/json-schema';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-formly-form-builder-preview',
  templateUrl: './formly-form-builder-preview.component.html',
  styleUrls: ['./formly-form-builder-preview.component.scss']
})
export class FormlyFormBuilderPreviewComponent implements OnDestroy, OnInit {

  public isFormLoading = true;

  public form: UntypedFormGroup;
  public model: { [key: string]: any };
  public options: FormlyFormOptions;
  public fields: FormlyFieldConfig[];

  private _subscriptions: Array<Subscription>;

  constructor(private formlyJsonschema: FormlyJsonschema, private formlyBuilder: FormlyFormBuilder) {
    this._subscriptions = [];

    this.form = new UntypedFormGroup({});
    this.model = getModel;
    this.options = getOptions();

    let jsonSchema = getFieldValues();

    let formlyFieldConfig = this.formlyJsonschema.toFieldConfig(jsonSchema as any);

    console.log('Formly Field Config Before Build Form', JSON.parse(JSON.stringify(formlyFieldConfig)));

    this.fields = [formlyFieldConfig];

    this.formlyBuilder.buildForm(this.form, this.fields, this.model, this.options);

    console.log('Formly Fields After Build Form', this.fields[0]);
    console.log('FormGroup', this.form);
  }

  ngOnInit() {
    this.isFormLoading = false;
  }

  ngOnDestroy() {
    this._subscriptions.forEach(x => x.unsubscribe());

    if (this.options.formState?.changeMap) {
      Object.values(this.options.formState?.changeMap || {}).forEach((x: any) => {
        if (x.unsubscribe) {
          x.unsubscribe();
        }
      });

      this.options.formState.changeMap = {};
    }
  }

  onSubmit(model: any) {
    console.log(`Called onSubmit!`);

    console.log(model);

    console.log(`JSON: ${JSON.stringify(model)}`);
  }
}

const getModel = {};

/* eslint-disable @typescript-eslint/naming-convention, max-len */












/* eslint-enable @typescript-eslint/naming-convention, max-len */




/* eslint-disable @typescript-eslint/naming-convention, max-len */

const getOptions = (): FormlyFormOptions => ({
  formState: {
    mainModel: getModel,
    changeMap: {}
  }
});

const getFieldValues = () => ({
  'type': 'object',
  'widget': {
    'formlyConfig': {
      'type': 'vertical-stepper-form',
      'props': {
        'linear': false,
        'labelPosition': 'end',
        'translationFormKey': 'h1b0026ddab6c487db2025849c61c0f38',
        'pageStates': {
          'party-info': {
            'icon': 'person',
            'class': 'material-icons-outlined'
          },
          'alarm': {
            'icon': 'alarm',
            'class': 'material-icons-outlined'
          }
        }
      }
    }
  },
  'properties': {
    'page1': {
      'type': 'object',
      'title': 'Step 1A',
      'widget': {
        'formlyConfig': {
          'defaultValue': {},
          'props': {
            'pageState': 'party-info',
            'isOptional': false
          }
        }
      },
      'properties': {
        'someCurrency': {
          '$ref': '#/definitions/someCurrency'
        },
        'dateField': {
          '$ref': '#/definitions/dateField'
        },
        'radioOption': {
          '$ref': '#/definitions/radioOption'
        },
        'someNumber': {
          '$ref': '#/definitions/someNumber'
        },
        'email': {
          '$ref': '#/definitions/email'
        },
        'reason': {
          '$ref': '#/definitions/reason'
        },
        'textToShow': {
          '$ref': '#/definitions/textToShow'
        }
      },
      'required': [
        'someNumber',
        'reason',
        'email',
        'dateField'
      ]
    },
    'page2': {
      'type': 'object',
      'title': 'Step 1B',
      'widget': {
        'formlyConfig': {
          'defaultValue': {},
          'props': {
            'pageState': 'alarm'
          }
        }
      },
      'properties': {
        'someNumber': {
          '$ref': '#/definitions/someNumber'
        },
        'selectAutoCompleteOption': {
          '$ref': '#/definitions/selectAutoCompleteOption'
        }
      },
      'required': [
        'someNumber',
        'selectAutoCompleteOption'
      ]
    },
    'page3': {
      'type': 'object',
      'title': 'Step 1C',
      'widget': {
        'formlyConfig': {
          'defaultValue': {},
          'props': {
            'pageState': 'alarm'
          }
        }
      },
      'properties': {
        'someNumber': {
          '$ref': '#/definitions/someNumber'
        },
        'selectOption': {
          '$ref': '#/definitions/selectOption'
        }
      }
    },
    'page4': {
      'type': 'object',
      'title': 'Step 1D',
      'widget': {
        'formlyConfig': {
          'defaultValue': {},
          'props': {
            'pageState': 'alarm'
          }
        }
      },
      'properties': {
        'someNumber': {
          '$ref': '#/definitions/someNumber'
        },
        'selectOption': {
          '$ref': '#/definitions/selectOption'
        }
      }
    }
  },
  'definitions': {
    'reason': {
      'type': 'textbox-field',
      'title': 'Reason text',
      'widget': {
        'formlyConfig': {
          'defaultValue': '',
          'props': {
            'placeholder': 'Enter reason...',
            'hint': 'Reason hint text'
          }
        },
      }
    },
    'email': {
      'type': 'string',
      'title': 'Email address',
      'widget': {
        'formlyConfig': {
          'type': 'text-input-field',
          'props': {
            'placeholder': 'my@email.com',
            'hint': 'Enter an email',
            'help': 'This would be some help content to show a party',
          }
        }
      }
    },
    'someCurrency': {
      'title': 'Enter an amount',
      'type': 'object',
      'widget': {
        'formlyConfig': {
          'type': 'currency-input-field',
          'defaultValue': {},
          'props': {
            'hint': 'some value'
          }
        }
      },
      'properties': {
        'amount': {
          'title': 'Amount',
          'type': 'number',
          'widget': {
            'formlyConfig': {
              'defaultValue': 234.58,
              'type': 'number',
              'props': {
                'placeholder': '50 dollars?'
              }
            }
          }
        },
        'currency': {
          'title': 'Select Currency',
          'type': 'string',
          'widget': {
            'formlyConfig': {
              'type': 'select',
              'defaultValue': 'USD',
              'props': {
                'placeholder': 'Select Currency',
                'options': [
                  { 'value': 'USD', 'label': 'USD' },
                  { 'value': 'AUD', 'label': 'AUD' },
                  { 'value': 'GBP', 'label': 'GBP' },
                  { 'value': 'EUR', 'label': 'EUR' },
                ]
              }
            }
          }
        }
      }
    },
    'dateField': {
      'title': 'Enter a Date',
      'type': 'string',
      'widget': {
        'formlyConfig': {
          'type': 'date-input-field',
          'defaultValue': '2022-07-24T00:00:00Z',
          'props': {
            'showLabelAbove': true,
          },
          'expressionProperties': {
            'model.dateField': 'model?.someNumber == 32 ? new Date(new Date(\'2021-03-31T00:00:00Z\').getYear() + 1900, new Date(\'2021-03-31T00:00:00Z\').getMonth() + 11, new Date(\'2021-03-31T00:00:00Z\').getDay()).toISOString() : model.dateField'
          }
        }
      }
    },
    'someNumber': {
      'title': 'Enter a number',
      'type': 'number',
      'widget': {
        'formlyConfig': {
          'type': 'number-input-field',
          'props': {
            'placeholder': '27...',
            'numberNot': 30,
            'minimumNumber': 18,
            'maximumNumber': 40,
            'defaultValidations': [
              'minimumNumber',
              'maximumNumber'
            ],
            'customValidations': {
              'numberNot': {
                'expression': 'value == props.numberNot',
                'message': '${value} is not allowed, because it is ${props.numberNot}',
              }
            },
            'businessRules': [
              {
                'conditions': {
                  'any': [
                    {
                      'fact': 'mainModel',
                      'operator': 'equal',
                      'value': 35,
                      'path': '$.page1.someNumber'
                    }
                  ]
                },
                'event': {
                  'type': 'required',
                  'params': {
                    'result': true,
                    'message': 'Some failure text'
                  }
                }
              },
              {
                'conditions': {
                  'any': [
                    {
                      'fact': 'mainModel',
                      'operator': 'lessThan',
                      'value': 23,
                      'path': '$.page1.someNumber'
                    }
                  ]
                },
                'event': {
                  'type': 'test-two',
                  'params': {
                    'result': true,
                    'message': 'Some failure text-two'
                  }
                }
              }
            ]
          }
        }
      }
    },
    'radioOption': {
      'title': 'My radio options',
      'type': 'string',
      'widget': {
        'formlyConfig': {
          'type': 'radio-button-field',
          'defaultValue': 'group2_option1',
          'props': {
            'required': true,
            'classes': ['flex', 'column'],
            'help': 'some more test text',
            'options': [
              { 'value': 'email', 'label': 'Email' },
              { 'value': 'number', 'label': 'Number' },
              { 'value': 'tel', 'label': 'Telephone' },
              { 'group': 'Group A', 'value': 'group1_option1', 'label': 'Group 1 First Option' },
              { 'group': 'Group A', 'value': 'group1_option2', 'label': 'Group 1 Second Option' },
              { 'group': 'Group A', 'value': 'group1_option3', 'label': 'Group 1 Third Option' },
              { 'group': 'Group 2', 'value': 'group2_option1', 'label': 'Group 2 First Option' },
              { 'group': 'Group 2', 'value': 'group2_option2', 'label': 'Group 2 Second Option' },
              { 'group': 'Group 2', 'value': 'group2_option3', 'label': 'Group 2 Third Option' },
              { 'value': 'text', 'label': 'Text' },
            ]
          },
          'expressionProperties': {
            'props.options': 'field.props._options.filter(x => !(model?.someNumber == 25 && x.value == \'email\')) || []',
            // 'model.radioOption': 'Array.isArray(model?.radioOption) ? field.props.options.filter(x => model.radioOption.includes(x.value)).map(x => x.value) : model?.radioOption && field.props.options.find(x => x.value == model.radioOption) ? model.radioOption : undefined'
          }
        }
      }
    },
    'selectOption': {
      'title': 'My selectable options',
      'type': 'string',
      'widget': {
        'formlyConfig': {
          'type': 'select-dropdown-field',
          'defaultValue': ['group1_option1', 'tel'],
          'props': {
            'placeholder': 'Enter selection',
            'multiple': true,
            'options': [
              { 'value': 'email', 'label': 'Email' },
              { 'value': 'number', 'label': 'Number' },
              { 'value': 'tel', 'label': 'Telephone' },
              { 'group': 'Group A', 'value': 'group1_option1', 'label': 'Group 1 First Option' },
              { 'group': 'Group A', 'value': 'group1_option2', 'label': 'Group 1 Second Option' },
              { 'group': 'Group A', 'value': 'group1_option3', 'label': 'Group 1 Third Option' },
              { 'group': 'Group 2', 'value': 'group2_option1', 'label': 'Group 2 First Option' },
              { 'group': 'Group 2', 'value': 'group2_option2', 'label': 'Group 2 Second Option' },
              { 'group': 'Group 2', 'value': 'group2_option3', 'label': 'Group 2 Third Option' },
              { 'value': 'text', 'label': 'Text' },
            ]
          },
          'expressionProperties': {
            'props.options': 'field.props._options.filter(x => !(model?.someNumber == 25 && x.value == \'email\')) || []',
            // 'model.selectOption': 'Array.isArray(model?.selectOption) ? field.props.options.filter(x => model.selectOption.includes(x.value)).map(x => x.value) : model?.selectOption && field.props.options.find(x => x.value == model.selectOption) ? model.selectOption : undefined'
          }
        }
      }
    },
    'selectAutoCompleteOption': {
      'title': 'My selectable options',
      'type': 'string',
      'widget': {
        'formlyConfig': {
          'type': 'select-autocomplete-field',
          'defaultValue': 'group2_option1',
          'props': {
            'placeholder': 'Enter selection',
            'options': [
              { 'value': 'email', 'label': 'Email' },
              { 'value': 'number', 'label': 'Number' },
              { 'value': 'tel', 'label': 'Telephone' },
              { 'group': 'Group A', 'value': 'group1_option1', 'label': 'Group 1 First Option' },
              { 'group': 'Group A', 'value': 'group1_option2', 'label': 'Group 1 Second Option' },
              { 'group': 'Group A', 'value': 'group1_option3', 'label': 'Group 1 Third Option' },
              { 'group': 'Group 2', 'value': 'group2_option1', 'label': 'Group 2 First Option' },
              { 'group': 'Group 2', 'value': 'group2_option2', 'label': 'Group 2 Second Option' },
              { 'group': 'Group 2', 'value': 'group2_option3', 'label': 'Group 2 Third Option' },
              { 'value': 'text', 'label': 'Text' },
            ]
          },
          'expressionProperties': {
            'props.options': 'field.props._options.filter(x => !(model?.someNumber == 25 && x.value == \'email\')) || []',
            // 'model.selectOption': 'Array.isArray(model?.selectOption) ? field.props.options.filter(x => model.selectOption.includes(x.value)).map(x => x.value) : model?.selectOption && field.props.options.find(x => x.value == model.selectOption) ? model.selectOption : undefined'
          }
        }
      }
    },
    'textToShow': {
      'title': 'Some text title',
      'type': 'null',
      'widget': {
        'formlyConfig': {
          'type': 'display-html',
          'props': {
            'html': 'This is my text to show!<br>The date is ${token.bday}<br>The date time is ${token.hearing}<br>The reason entered is ${token.reasonText}<br>My Function output: ${token.myFunction}',
            'classes': 'fill-green',
          }
        }
      }
    }
  }
})
/* eslint-enable @typescript-eslint/naming-convention, max-len */
