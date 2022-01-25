import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { FormlyJsonschema } from '@ngx-formly/core/json-schema';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-formly-preview',
  templateUrl: './formly-preview.component.html',
  styleUrls: ['./formly-preview.component.scss']
})
export class FormlyPreviewComponent implements OnDestroy, OnInit {

  public isFormLoading = true;

  public form: FormGroup;

  public model = {};

  public options: FormlyFormOptions = {
    formState: {
      mainModel: this.model,
      formTokens: {
        bday: {
          type: 'date',
          value: '2021-03-25T13:51:19.000-05:00'
        },
        hearing: {
          type: 'datetime',
          value: '2021-04-25T23:54:15.000-05:00'
        },
        reasonText: {
          type: 'string',
          $ref: 'page1.reason'
        },
        myFunction: {
          type: 'function',
          value: '{ return `${token?.reasonText}` === \'Hello!\' ? \'Its hello!\' : `Its not hello, its instead: ${token.reasonText}`; }'
        }
      }
    }
  };

  public fields: FormlyFieldConfig[];

  private _subscriptions: Array<Subscription>;

  constructor(private formlyJsonschema: FormlyJsonschema) {
    this._subscriptions = [];

    this.form = new FormGroup({});
    // this.options = {};

    // this.fields = setFieldValues();

    let field = getFieldValues();
    // let field = fileDisputeForm();
    // let field = testForm();

    let jsonSchema = this.formlyJsonschema.toFieldConfig(field as any);

    console.log(jsonSchema);

    this.fields = [jsonSchema];
  }

  ngOnInit() {
    this.isFormLoading = false;
  }

  ngOnDestroy() {
    this._subscriptions.forEach(x => x.unsubscribe());
  }

  onSubmit(model: any) {
    console.log(`Called onSubmit!`);

    console.log(model);

    console.log(`JSON: ${JSON.stringify(model)}`);
  }
}

/* eslint-disable @typescript-eslint/naming-convention, max-len */
const fileDisputeForm = () => ({
  "type": "object",
  "widget": {
    "formlyConfig": {
      "type": "default-form",
      "defaultValue": {},
      "templateOptions": {
        "verticalStepper": false,
        "linear": false,
        "labelPosition": "end"
      }
    }
  },
  "properties": {
    "page": {
      "type": "object",
      "title": "File a Dispute",
      "widget": {
        "formlyConfig": {
          "defaultValue": {},
          "templateOptions": {
            "isOptional": false,
            "hideExpression": "",
            "_order": "1"
          }
        }
      },
      "properties": {
        "message": {
          "type": "null",
          "title": "Display Field",
          "widget": {
            "formlyConfig": {
              "type": "display-html",
              "templateOptions": {
                "_order": "1",
                "html": "<p>Please finish the following form to complete the intake process.</p>"
              }
            }
          }
        },
        "courtCaseNumber": {
          "type": "string",
          "title": "Case #",
          "widget": {
            "formlyConfig": {
              "type": "text-input-field",
              "templateOptions": {
                "_order": "2"
              }
            }
          }
        },
        "preTrialConfernceDate": {
          "type": "string",
          "title": "Pre-trial conference date",
          "widget": {
            "formlyConfig": {
              "type": "date-input-field",
              "templateOptions": {
                "hint": "If it is less than 5 days until the Pre-Trial Conference Date, verify that this case should be sent to Online Resolution.",
                "_order": "3"
              }
            }
          }
        },
        "plaintiff": {
          "type": "object",
          "widget": {
            "formlyConfig": {
              "defaltValue": {},
              "templateOptions": {
                "_order": "4"
              }
            }
          },
          "properties": {
            "type": {
              "type": "string",
              "title": "Plaintiff type",
              "widget": {
                "formlyConfig": {
                  "type": "select-dropdown-field",
                  "templateOptions": {
                    "options": [
                      {
                        "label": "Individual - Self-represented",
                        "value": "individual",
                        "group": "",
                        "_order": "1"
                      },
                      {
                        "label": "Individual - Represented by someone else (e.g. an attorney)",
                        "value": "individual_with_rep",
                        "group": "",
                        "_order": "2"
                      },
                      {
                        "label": "Company",
                        "value": "company",
                        "group": "",
                        "_order": "3"
                      }
                    ],
                    "_order": "1"
                  }
                }
              }
            },
            "firstName": {
              "type": "string",
              "title": "Plaintiff First Name",
              "widget": {
                "formlyConfig": {
                  "type": "text-input-field",
                  "templateOptions": {
                    "_order": "2",
                    "classes": "pad-left"
                  },
                  "expressionProperties": {
                    "templateOptions.required": "!field.hide",
                    "templateOptions.label": "field.model?.type === 'company' ? 'Plaintiff (Company) Name' : 'Plaintiff First Name'"
                  },
                  "hideExpression": "!model?.type"
                }
              }
            },
            "lastName": {
              "type": "string",
              "title": "Plaintiff Last Name",
              "widget": {
                "formlyConfig": {
                  "type": "text-input-field",
                  "templateOptions": {
                    "_order": "3",
                    "classes": "pad-left"
                  },
                  "expressionProperties": {
                    "templateOptions.required": "!field.hide"
                  },
                  "hideExpression": "!model?.type || model?.type === 'company'"
                }
              }
            },
            "email": {
              "type": "string",
              "title": "Plaintiff Email Address",
              "widget": {
                "formlyConfig": {
                  "type": "text-input-field",
                  "templateOptions": {
                    "_order": "4",
                    "classes": "pad-left"
                  },
                  "expressionProperties": {
                    "templateOptions.required": "!field.hide"
                  },
                  "hideExpression": "!model?.type || model?.type !== 'individual'"
                }
              }
            },
            "repFirstName": {
              "type": "string",
              "title": "Plaintiff Representative First Name",
              "widget": {
                "formlyConfig": {
                  "type": "text-input-field",
                  "templateOptions": {
                    "_order": "5",
                    "classes": "pad-left"
                  },
                  "expressionProperties": {
                    "templateOptions.required": "!field.hide",
                    "templateOptions.label": "model?.type === 'company' ? 'Plaintiff (Company) Representative First Name' : 'Plaintiff Representative First Name'"
                  },
                  "hideExpression": "!model?.type || model?.type === 'individual'"
                }
              }
            },
            "repLastName": {
              "type": "string",
              "title": "Plaintiff Representative Last Name",
              "widget": {
                "formlyConfig": {
                  "type": "text-input-field",
                  "templateOptions": {
                    "_order": "6",
                    "classes": "pad-left"
                  },
                  "expressionProperties": {
                    "templateOptions.required": "!field.hide",
                    "templateOptions.label": "model?.type === 'company' ? 'Plaintiff (Company) Representative Last Name' : 'Plaintiff Representative Last Name'"
                  },
                  "hideExpression": "!model?.type || model?.type === 'individual'"
                }
              }
            },
            "repEmail": {
              "type": "string",
              "title": "Plaintiff Representative Email Address",
              "widget": {
                "formlyConfig": {
                  "type": "text-input-field",
                  "templateOptions": {
                    "_order": "7",
                    "classes": "pad-left"
                  },
                  "expressionProperties": {
                    "templateOptions.required": "!field.hide",
                    "templateOptions.label": "model?.type === 'company' ? 'Plaintiff (Company) Representative Email Address' : 'Plaintiff Representative Email Address'"
                  },
                  "hideExpression": "!model?.type || model?.type === 'individual'"
                }
              }
            }
          }
        },
        "defendant": {
          "type": "object",
          "widget": {
            "formlyConfig": {
              "defaltValue": {},
              "templateOptions": {
                "_order": "5"
              }
            }
          },
          "properties": {
            "type": {
              "type": "string",
              "title": "Defendant type",
              "widget": {
                "formlyConfig": {
                  "type": "select-dropdown-field",
                  "templateOptions": {
                    "options": [
                      {
                        "label": "Individual - Self-represented",
                        "value": "individual",
                        "group": "",
                        "_order": "1"
                      },
                      {
                        "label": "Individual - Represented by someone else (e.g. an attorney)",
                        "value": "individual_with_rep",
                        "group": "",
                        "_order": "2"
                      },
                      {
                        "label": "Company",
                        "value": "company",
                        "group": "",
                        "_order": "3"
                      }
                    ],
                    "_order": "1"
                  }
                }
              }
            },
            "firstName": {
              "type": "string",
              "title": "Defendant First Name",
              "widget": {
                "formlyConfig": {
                  "type": "text-input-field",
                  "templateOptions": {
                    "_order": "2",
                    "classes": "pad-left"
                  },
                  "expressionProperties": {
                    "templateOptions.required": "!field.hide",
                    "templateOptions.label": "field.model?.type === 'company' ? 'Defendant (Company) Name' : 'Defendant First Name'"
                  },
                  "hideExpression": "!model?.type"
                }
              }
            },
            "lastName": {
              "type": "string",
              "title": "Defendant Last Name",
              "widget": {
                "formlyConfig": {
                  "type": "text-input-field",
                  "templateOptions": {
                    "_order": "3",
                    "classes": "pad-left"
                  },
                  "expressionProperties": {
                    "templateOptions.required": "!field.hide"
                  },
                  "hideExpression": "!model?.type || model?.type === 'company'"
                }
              }
            },
            "email": {
              "type": "string",
              "title": "Defendant Email Address",
              "widget": {
                "formlyConfig": {
                  "type": "text-input-field",
                  "templateOptions": {
                    "_order": "4",
                    "classes": "pad-left"
                  },
                  "expressionProperties": {
                    "templateOptions.required": "!field.hide"
                  },
                  "hideExpression": "!model?.type || model?.type !== 'individual'"
                }
              }
            },
            "repFirstName": {
              "type": "string",
              "title": "Defendant Representative First Name",
              "widget": {
                "formlyConfig": {
                  "type": "text-input-field",
                  "templateOptions": {
                    "_order": "5",
                    "classes": "pad-left"
                  },
                  "expressionProperties": {
                    "templateOptions.required": "!field.hide",
                    "templateOptions.label": "model?.type === 'company' ? 'Defendant (Company) Representative First Name' : 'Defendant Representative First Name'"
                  },
                  "hideExpression": "!model?.type || model?.type === 'individual'"
                }
              }
            },
            "repLastName": {
              "type": "string",
              "title": "Defendant Representative Last Name",
              "widget": {
                "formlyConfig": {
                  "type": "text-input-field",
                  "templateOptions": {
                    "_order": "6",
                    "classes": "pad-left"
                  },
                  "expressionProperties": {
                    "templateOptions.required": "!field.hide",
                    "templateOptions.label": "model?.type === 'company' ? 'Defendant (Company) Representative Last Name' : 'Defendant Representative Last Name'"
                  },
                  "hideExpression": "!model?.type || model?.type === 'individual'"
                }
              }
            },
            "repEmail": {
              "type": "string",
              "title": "Defendant Representative Email Address",
              "widget": {
                "formlyConfig": {
                  "type": "text-input-field",
                  "templateOptions": {
                    "_order": "7",
                    "classes": "pad-left"
                  },
                  "expressionProperties": {
                    "templateOptions.required": "!field.hide",
                    "templateOptions.label": "model?.type === 'company' ? 'Defendant (Company) Representative Email Address' : 'Defendant Representative Email Address'"
                  },
                  "hideExpression": "!model?.type || model?.type === 'individual'"
                }
              }
            }
          }
        },
      },
      "required": [
        "plaintiff",
        "defendant"
      ]
    }
  },
  "required": [],
  "title": "File a Dispute"
})


const testForm = () => ({
  "type": "object",
  "widget": {
    "formlyConfig": {
      "type": "tab-form",
      "defaultValue": {},
      "templateOptions": {
        "verticalStepper": false,
        "linear": false,
        "labelPosition": "end"
      }
    }
  },
  "properties": {
    "7140fa2886b447259cab768fc2112427": {
      "type": "object",
      "title": "How you're doing",
      "widget": {
        "formlyConfig": {
          "defaultValue": {},
          "templateOptions": {
            "isOptional": false,
            "hideExpression": "",
            "_order": "1"
          }
        }
      },
      "properties": {
        "7e6df5d65783499dac9efbc79572b8f3": {
          "type": "string",
          "title": "Whats up?",
          "widget": {
            "formlyConfig": {
              "type": "input-field",
              "templateOptions": {
                "type": "text",
                "_order": "1"
              }
            }
          }
        },
        "d8b1177eff4c4703a56cfa74cef30e8a": {
          "type": "string",
          "title": "What is your mood?",
          "widget": {
            "formlyConfig": {
              "type": "select-dropdown-field",
              "templateOptions": {
                "options": [
                  {
                    "label": "Happy",
                    "value": "happy",
                    "group": "",
                    "_order": "1",
                    "_referenceId": "b35961e1366c49528e1399949d3b2a1e"
                  },
                  {
                    "label": "Meh",
                    "value": "meh",
                    "group": "",
                    "_order": "2",
                    "_referenceId": "b04f4522ffe54189bd0e42d50d063494"
                  },
                  {
                    "label": "Sad",
                    "value": "sad",
                    "group": "",
                    "_order": "3",
                    "_referenceId": "18ba459f8a224c029a299fbf93999a8e"
                  }
                ],
                "_order": "2"
              }
            }
          }
        }
      },
      "required": []
    },
    "8f33a72acece46e9bab4428c33e48362": {
      "type": "object",
      "title": "About Us",
      "widget": {
        "formlyConfig": {
          "defaultValue": {},
          "templateOptions": {
            "isOptional": false,
            "hideExpression": "",
            "_order": "2"
          }
        }
      },
      "properties": {
        "114a4c4d204a43a698fd14a2cf667ea8": {
          "type": "null",
          "title": "Display Field",
          "widget": {
            "formlyConfig": {
              "type": "display-html",
              "templateOptions": {
                "_order": "1",
                "html": "<h1 style=\"text-align:center\"><strong>About Us</strong></h1><p>We care about you!</p>"
              }
            }
          }
        }
      },
      "required": []
    },
    "0a2cb59b15794dc688b950e8a78e2ebb": {
      "type": "object",
      "title": "How are you doing?",
      "widget": {
        "formlyConfig": {
          "defaultValue": {},
          "templateOptions": {
            "isOptional": false,
            "hideExpression": "",
            "_order": "3"
          }
        }
      },
      "properties": {
        "5e8c716d305649d39993ebf3925bd0e0": {
          "type": "string",
          "title": "What is your claim amount?",
          "widget": {
            "formlyConfig": {
              "type": "input-field",
              "templateOptions": {
                "type": "number",
                "_order": "1"
              }
            }
          }
        },
        "5257d22e09b848f29e396cabd3103195": {
          "type": "null",
          "title": "Display Field",
          "widget": {
            "formlyConfig": {
              "type": "display-html",
              "templateOptions": {
                "_order": "2",
                "html": "<h1 style=\"text-align:center\">This is my header</h1><p>This is about us</p><p>this is my site link</p>"
              }
            }
          }
        }
      },
      "required": []
    }
  },
  "required": [],
  "title": "Some form name",
  "definitions": {}
})

const getFieldValues = () => ({
  'type': 'object',
  'widget': {
    'formlyConfig': {
      'type': 'stepper-form',
      'templateOptions': {
        'verticalStepper': false,
        'linear': false,
        'labelPosition': 'end',
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
          'templateOptions': {
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
        // 'someNumber',
        // 'reason'
        'dateField'
      ]
    },
    'page2': {
      'type': 'object',
      'title': 'Step 1B',
      'widget': {
        'formlyConfig': {
          'defaultValue': {},
          'templateOptions': {
            'pageState': 'alarm'
          }
        }
      },
      'properties': {
        'tabularArray': {
          '$ref': '#/definitions/tabularArray'
        },
      }
    },
    'page3': {
      'type': 'object',
      'title': 'Step 1C',
      'widget': {
        'formlyConfig': {
          'defaultValue': {},
          'templateOptions': {
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
    'page4': {
      'type': 'object',
      'title': 'Step 1D',
      'widget': {
        'formlyConfig': {
          'defaultValue': {},
          'templateOptions': {
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
    'page5': {
      'type': 'object',
      'title': 'Step 1E',
      'widget': {
        'formlyConfig': {
          'defaultValue': {},
          'templateOptions': {
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
      'title': 'Reason text that is longer longer longer longer longer longer ${token.reasonText}',
      'widget': {
        'formlyConfig': {
          'defaultValue': '',
          'templateOptions': {
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
          'templateOptions': {
            'placeholder': 'my@email.com',
            'hint': 'Enter an email',
            'help': 'This would be some help content to show a party',
          }
        }
      }
    },
    'tabularArray': {
      'title': 'Children Information',
      'type': 'array',
      'widget': {
        'formlyConfig': {
          'type': 'expansion-panel-array-field',
          'defaultValue': [],
          'templateOptions': {
            'showAddButton': true,
            'addButtonConfig': {
              'hideIcon': false,
              'buttonText': 'Add Child',
              'classes': ''
            },
            'columns': [
              {
                '_order': 2,
                'label': 'Number',
                'path': 'page1.someNumber',
                'type': 'data',
                'classes': ''
              },
              {
                '_order': 3,
                'label': 'Selected Option',
                'path': 'page2.selectOption',
                'type': 'data',
                'classes': ''
              },
              {
                '_order': 1,
                'label': 'Email',
                'path': 'page1.email',
                'type': 'data',
                'classes': ''
              }
            ]
          }
        }
      },
      'items': {
        'title': 'Element Definition',
        'type': 'object',
        'widget': {
          'formlyConfig': {
            'defaultValue': {},
            'templateOptions': {

            }
          }
        },
        'properties': {
          'required': {
            'title': 'Entry required?',
            'type': 'boolean',
            'widget': {
              'formlyConfig': {
                'defaultValue': false,
                'hide': true
              }
            }
          },
          'complete': {
            'title': 'Entry complete?',
            'type': 'boolean',
            'widget': {
              'formlyConfig': {
                'defaultValue': false,
                'hide': true
              }
            }
          },
          'fields': {
            'type': 'object',
            'widget': {
              'formlyConfig': {
                'type': 'page-form',
                'templateOptions': {
                  'verticalStepper': false,
                  'linear': false,
                  'labelPosition': 'end',
                  'hideSubmit': true,
                  'useSmallButtons': true,
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
                    'templateOptions': {
                      'pageState': 'party-info',
                      'isOptional': false,
                      'hideLabel': true,
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
                  'email'
                ]
              },
              'page2': {
                'type': 'object',
                'title': 'Step 1B',
                'widget': {
                  'formlyConfig': {
                    'defaultValue': {},
                    'templateOptions': {
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
                },
                'required': [
                  'selectOption'
                ]
              }
            }
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
          'templateOptions': {
            'type': 'currency',
            'baseTenMaxDigits': '100000000000'
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
              'templateOptions': {
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
              'templateOptions': {
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
          'templateOptions': {
            'encapsulateLabel': true,
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
          'templateOptions': {
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
                'expression': 'value == to.numberNot',
                'message': '${value} is not allowed, because it is ${to.numberNot}',
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
          'templateOptions': {
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
            'templateOptions.options': 'field.templateOptions._options.filter(x => !(model?.someNumber == 25 && x.value == \'email\')) || []',
            // 'model.radioOption': 'Array.isArray(model?.radioOption) ? field.templateOptions.options.filter(x => model.radioOption.includes(x.value)).map(x => x.value) : model?.radioOption && field.templateOptions.options.find(x => x.value == model.radioOption) ? model.radioOption : undefined'
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
          'defaultValue': 'group1_option1',
          'templateOptions': {
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
            'templateOptions.options': 'field.templateOptions._options.filter(x => !(model?.someNumber == 25 && x.value == \'email\')) || []',
            // 'model.selectOption': 'Array.isArray(model?.selectOption) ? field.templateOptions.options.filter(x => model.selectOption.includes(x.value)).map(x => x.value) : model?.selectOption && field.templateOptions.options.find(x => x.value == model.selectOption) ? model.selectOption : undefined'
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
          'templateOptions': {
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
            'templateOptions.options': 'field.templateOptions._options.filter(x => !(model?.someNumber == 25 && x.value == \'email\')) || []',
            // 'model.selectOption': 'Array.isArray(model?.selectOption) ? field.templateOptions.options.filter(x => model.selectOption.includes(x.value)).map(x => x.value) : model?.selectOption && field.templateOptions.options.find(x => x.value == model.selectOption) ? model.selectOption : undefined'
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
          'templateOptions': {
            'html': 'This is my text to show!<br>The date is ${token.bday}<br>The date time is ${token.hearing}<br>The reason entered is ${token.reasonText}<br>My Function output: ${token.myFunction}',
            'classes': 'fill-green',
          }
        }
      }
    }
  }
})
/* eslint-enable @typescript-eslint/naming-convention, max-len */
