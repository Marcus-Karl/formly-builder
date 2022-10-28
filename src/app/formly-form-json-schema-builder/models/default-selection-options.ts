import { buildSelectionOptions } from '../builder';
import { FormBuilderSelectionOption, SelectionOptionType } from '../models/builder-form-state';

const FREE_RESPONSE_FIELDS: FormBuilderSelectionOption[] = [
  {
    value: 'free-response-field',
    label: 'Free Response Field',
    type: SelectionOptionType.FieldCategory,
    options: [
      {
        value: 'currency-input-field',
        label: 'Currency',
        type: SelectionOptionType.FieldType,
        schemaDefaults: {
          type: 'object',
          widget: {
            formlyConfig: {
              defaultValue: {}
            }
          },
          properties: {
            amount: {
              title: 'Amount',
              type: 'number'
            },
            currency: {
              title: 'Select Currency',
              type: 'string',
              widget: {
                formlyConfig: {
                  type: 'select',
                  defaultValue: 'USD',
                  props: {
                    placeholder: 'Select Currency',
                    options: [
                      { value: 'USD', label: 'USD' },
                      { value: 'AUD', label: 'AUD' },
                      { value: 'GBP', label: 'GBP' },
                      { value: 'EUR', label: 'EUR' },
                    ]
                  }
                }
              }
            }
          },
          required: ['amount', 'currency']
        }
      },
      {
        value: 'date-input-field',
        label: 'Date',
        type: SelectionOptionType.FieldType,
        schemaDefaults: {
          format: 'date'
        }
      },
      {
        value: 'date-time-input-field',
        label: 'Date & Time',
        type: SelectionOptionType.FieldType,
        schemaDefaults: {
          format: 'date-time'
        }
      },
      {
        value: 'email-input-field',
        label: 'Email',
        type: SelectionOptionType.FieldType,
        schemaDefaults: {
          format: 'email',
          pattern: '^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z0-9]{2,6}$'
        }
      },
      {
        value: 'number-input-field',
        label: 'Number',
        type: SelectionOptionType.FieldType,
        schemaDefaults: {
          type: 'number'
        }
      },
      {
        value: 'phone-input-field',
        label: 'Telephone',
        type: SelectionOptionType.FieldType,
      },
      {
        value: 'text-input-field',
        label: 'Text',
        type: SelectionOptionType.FieldType,
      },
      {
        value: 'textbox-field',
        label: 'Textbox',
        type: SelectionOptionType.FieldType,
      }
    ]
  }
];

const MULTIPLE_CHOICE_FIELDS: FormBuilderSelectionOption[] = [
  {
    value: 'multiple-choice-field',
    label: 'Multiple Choice Field',
    type: SelectionOptionType.FieldCategory,
    options: [
      {
        type: SelectionOptionType.FieldType,
        value: 'select-autocomplete-field',
        label: 'Auto Complete Select Field'
      },
      {
        type: SelectionOptionType.FieldType,
        value: 'select-dropdown-field',
        label: 'Dropdown Select Field',
        schemaDefaults: {
          widget: {
            formlyConfig: {
              props: {
                multiple: false
              }
            }
          }
        }
      },
      {
        type: SelectionOptionType.FieldType,
        value: 'radio-button-field',
        label: 'Radio Button Field'
      }
    ]
  }
];

const FORM_TYPES: FormBuilderSelectionOption[] = [
  {
    value: 'form',
    label: 'Form Types',
    type: SelectionOptionType.FormCategory,
    options: [
      {
        value: 'default-form',
        label: 'Default Form',
        type: SelectionOptionType.Form,
      },
      {
        value: 'page-form',
        label: 'Page Form',
        type: SelectionOptionType.Form,
      },
      {
        value: 'stepper-form',
        label: 'Step Form',
        type: SelectionOptionType.Form,
        schemaDefaults: {
          widget: {
            formlyConfig: {
              props: {
                verticalStepper: false,
                linear: false,
                labelPosition: 'end',
              }
            }
          }
        }
      },
      {
        value: 'tab-form',
        label: 'Tab Form',
        type: SelectionOptionType.Form,
      }
    ]
  }
];

const COMPLEX_OBJECT: FormBuilderSelectionOption[] = [
  {
    value: 'complex-object-field',
    label: 'Complex Object',
    type: SelectionOptionType.FieldCategory,
    category: 'field',
    options: [
      {
        type: SelectionOptionType.FieldType,
        value: 'complex-object',
        label: 'Complex Object'
      }
    ]
  }
];

const PRECONFIGURED_SCHEMA: FormBuilderSelectionOption[] = [
  {
    value: 'preconfigured-schema',
    label: 'Preconfigured Schema',
    type: SelectionOptionType.FieldCategory,
    category: 'field',
    options: [
      {
        value: 'request-information',
        label: 'Request Information',
        type: SelectionOptionType.FieldType,
        builderSchemaDefaults: {
          basic: {
            name: 'requestInformation',
            label: ''
          },
          objectSchema: {
            type: 'object',
            properties: {
              type: {
                type: 'object',
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
          }
        },
        schemaDefaults: {
          type: 'object',
          widget: {
            formlyConfig: {
              expressions: {
                hide: true
              }
            }
          }
        }
      },
      {
        value: 'attachments',
        label: 'Attachments',
        type: SelectionOptionType.FieldType,
        builderSchemaDefaults: {
          basic: {
            name: 'attachments',
            label: ''
          }
        },
        schemaDefaults: {
          type: 'array',
          maxItems: 100,
          widget: {
            formlyConfig: {
              type: 'attachments',
              props: {
                label: 'Attachments'
              }
            }
          },
          items: {
            type: 'object',
            properties: {
              documentName: {
                type: 'string'
              },
              documentId: {
                type: 'string'
              },
              size: {
                type: 'number'
              },
              contentType: {
                type: 'string'
              },
              createdByUserId: {
                type: 'string'
              },
              createdBy: {
                type: 'string'
              },
              createdDate: {
                type: 'string'
              }
            }
          }
        }
      },
      {
        value: 'supportingDocuments',
        label: 'Supporting Documents',
        type: SelectionOptionType.FieldType,
        builderSchemaDefaults: {
          basic: {
            name: 'supportingDocuments',
            label: ''
          }
        },
        schemaDefaults: {
          type: 'array',
          widget: {
            formlyConfig: {
              type: 'supplementalForms'
            }
          },
          items: {
            type: 'object',
            properties: {
              documentName: {
                type: 'string'
              },
              id: {
                type: 'string'
              },
              isRequired: {
                type: 'boolean'
              },
              documentId: {
                type: 'string'
              }
            }
          }
        }
      }
    ]
  }
];

const UNKNOWN_FIELD_TYPES: FormBuilderSelectionOption[] = [
  {
    value: 'unknown-free-response-field',
    label: 'Unknown Free Response Field',
    type: SelectionOptionType.FieldCategory,
    category: 'field',
    options: [
      {
        value: 'string',
        label: 'String',
        type: SelectionOptionType.FieldType
      },
      {
        value: 'number',
        label: 'Number',
        type: SelectionOptionType.FieldType,
        schemaDefaults: {
          type: 'number'
        }
      },
      {
        value: 'boolean',
        label: 'Boolean',
        type: SelectionOptionType.FieldType,
        schemaDefaults: {
          type: 'checkbox'
        }
      },
      {
        value: 'integer',
        label: 'Integer',
        type: SelectionOptionType.FieldType,
        schemaDefaults: {
          type: 'number'
        }
      }
    ]
  },
  {
    value: 'unknown-multiple-choice-field',
    label: 'Unknown Multiple Choice Field',
    type: SelectionOptionType.FieldCategory,
    category: 'field',
    options: []
  },
  {
    value: 'unknown-complex-object-field',
    label: 'Unknown Complex Object',
    type: SelectionOptionType.FieldCategory,
    category: 'field',
    options: [
      {
        type: SelectionOptionType.FieldType,
        value: 'object',
        label: 'Object'
      }
    ]
  }
];

const DISPLAY_CONTENT: FormBuilderSelectionOption[] = [
  {
    value: 'display-content-field',
    label: 'Display Content',
    type: SelectionOptionType.FieldCategory,
    category: 'display',
    options: [
      {
        type: SelectionOptionType.FieldType,
        value: 'display-html',
        label: 'Display Content',
        schemaDefaults: {
          type: 'null',
          title: 'Display Field',
          widget: {
            formlyConfig: {
              type: 'display-html',
              defaultValue: null
            }
          }
        }
      }
    ]
  }
];

const DEFAULT_FORM_BUILDER_SELECTION_CONFIGURATION: FormBuilderSelectionOption = {
  value: '',
  label: 'Base',
  type: SelectionOptionType.Base,
  options: [
    ...COMPLEX_OBJECT,
    ...PRECONFIGURED_SCHEMA,
    ...UNKNOWN_FIELD_TYPES,
    ...DISPLAY_CONTENT,
    ...FREE_RESPONSE_FIELDS,
    ...MULTIPLE_CHOICE_FIELDS,
    ...FORM_TYPES
  ]
};

export const getDefaultSelectionOptionsMap = (): { [key in SelectionOptionType]: FormBuilderSelectionOption[] } => ({
  [SelectionOptionType.Base]: buildSelectionOptions(DEFAULT_FORM_BUILDER_SELECTION_CONFIGURATION, SelectionOptionType.Base),
  [SelectionOptionType.FieldCategory]: buildSelectionOptions(DEFAULT_FORM_BUILDER_SELECTION_CONFIGURATION, SelectionOptionType.FieldCategory),
  [SelectionOptionType.FieldType]: buildSelectionOptions(DEFAULT_FORM_BUILDER_SELECTION_CONFIGURATION, SelectionOptionType.FieldType),
  [SelectionOptionType.FieldSubType]: buildSelectionOptions(DEFAULT_FORM_BUILDER_SELECTION_CONFIGURATION, SelectionOptionType.FieldSubType),
  [SelectionOptionType.Form]: buildSelectionOptions(DEFAULT_FORM_BUILDER_SELECTION_CONFIGURATION, SelectionOptionType.Form),
  [SelectionOptionType.FormCategory]: buildSelectionOptions(DEFAULT_FORM_BUILDER_SELECTION_CONFIGURATION, SelectionOptionType.FormCategory)
});

export const sortSelectionOptions = (options?: FormBuilderSelectionOption[]) => {
  options?.sort((left, right) => left.label?.localeCompare(right.label));
  options?.forEach(option => sortSelectionOptions(option.options));
};
