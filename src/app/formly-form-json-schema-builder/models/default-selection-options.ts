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
                  templateOptions: {
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
          }
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
      },
      {
        value: 'email-input-field',
        label: 'Email',
        type: SelectionOptionType.FieldType,
      },
      {
        value: 'number-input-field',
        label: 'Number',
        type: SelectionOptionType.FieldType,
        schemaDefaults: {
          format: 'date'
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
]

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
        label: 'Dropdown Select Field'
      },
      {
        type: SelectionOptionType.FieldType,
        value: 'radio-button-field',
        label: 'Radio Button Field'
      }
    ]
  }
]

const FORM_TYPES: FormBuilderSelectionOption[] = [
  {
    value: 'form',
    label: 'Form Types',
    type: SelectionOptionType.FieldCategory,
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
              templateOptions: {
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
]

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
]

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
              type: 'display-html'
            }
          }
        }
      }
    ]
  }
]

const TOKEN_CATEGORIES: FormBuilderSelectionOption[] = [
  {
    value: 'answer-based',
    label: 'Answer Based',
    type: SelectionOptionType.TokenCategory
  },
  {
    value: 'dispute',
    label: 'Dispute',
    type: SelectionOptionType.TokenCategory
  },
  {
    value: 'site',
    label: 'Site Information',
    type: SelectionOptionType.TokenCategory
  },
  {
    value: 'static',
    label: 'Static',
    type: SelectionOptionType.TokenCategory
  }
]

const TOKEN_TYPES: FormBuilderSelectionOption[] = [
  {
    value: 'date',
    label: 'Date',
    type: SelectionOptionType.TokenType
  },
  {
    value: 'datetime',
    label: 'Date & Time',
    type: SelectionOptionType.TokenType
  },
  {
    value: 'externalLink',
    label: 'External URL',
    type: SelectionOptionType.TokenType
  },
  {
    value: 'function',
    label: 'Function',
    type: SelectionOptionType.TokenType
  },
  {
    value: 'siteLink',
    label: 'Page Link',
    type: SelectionOptionType.TokenType
  }
]

const COMPARISON_OPERATORS: FormBuilderSelectionOption[] = [
  {
    value: '',
    label: 'Operators',
    type: SelectionOptionType.ComparisonOperator,
    options: [
      {
        value: '>',
        label: '> (Greater Than)',
        group: 'Comparison Operators',
        type: SelectionOptionType.ComparisonOperator,
        categories: [
          'field',
          'predefined',
          'currency-input-field',
          'number-input-field'
        ]
      },
      {
        value: '>=',
        label: '>= (Greater Than or Equal)',
        group: 'Comparison Operators',
        type: SelectionOptionType.ComparisonOperator,
        categories: [
          'field',
          'predefined',
          'currency-input-field',
          'number-input-field'
        ]
      },
      {
        value: '<',
        label: '< (Less Than)',
        group: 'Comparison Operators',
        type: SelectionOptionType.ComparisonOperator,
        categories: [
          'field',
          'predefined',
          'currency-input-field',
          'number-input-field'
        ]
      },
      {
        value: '<=',
        label: '<= (Less Than or Equal)',
        group: 'Comparison Operators',
        type: SelectionOptionType.ComparisonOperator,
        categories: [
          'field',
          'predefined',
          'currency-input-field',
          'number-input-field'
        ]
      },
      {
        value: '==',
        label: '== (Equal)',
        group: 'Comparison Operators',
        type: SelectionOptionType.ComparisonOperator,
        categories: [
          'field',
          'predefined',
          'currency-input-field',
          'number-input-field'
        ]
      },
      {
        value: '!=',
        label: '!= (Not Equal)',
        group: 'Comparison Operators',
        type: SelectionOptionType.ComparisonOperator,
        categories: [
          'field',
          'predefined',
          'currency-input-field',
          'number-input-field'
        ]
      },
      {
        value: '&&',
        label: '&& (And)',
        group: 'Logical Operators',
        type: SelectionOptionType.ComparisonOperator
      },
      {
        value: '||',
        label: '|| (Or)',
        group: 'Logical Operators',
        type: SelectionOptionType.ComparisonOperator
      },
      {
        value: '!',
        label: '! (Not)',
        group: 'Logical Operators',
        type: SelectionOptionType.ComparisonOperator
      },
      {
        value: 'in',
        label: 'In (Value Is In)',
        group: 'Relational Operator',
        type: SelectionOptionType.ComparisonOperator,
        categories: [
          'field',
          'multiple-choice-field',
          'currency-input-field'
        ]
      },
      {
        value: 'notin',
        label: 'Not In (Value Is Not In)',
        group: 'Relational Operator',
        type: SelectionOptionType.ComparisonOperator,
        categories: [
          'field',
          'multiple-choice-field',
          'currency-input-field'
        ]
      },
      {
        value: 'between_exclusive',
        label: 'Between Exclusive (Between But Not Equal To)',
        group: 'Relational Operator',
        type: SelectionOptionType.ComparisonOperator,
        categories: [
          'field',
          'currency-input-field',
          'number-input-field'
        ]
      },
      {
        value: 'between_inclusive',
        label: 'Between Inclusive (Between Or Equal To)',
        group: 'Relational Operator',
        type: SelectionOptionType.ComparisonOperator,
        categories: [
          'field',
          'currency-input-field',
          'number-input-field'
        ]
      },
      {
        value: 'match',
        label: 'Matches (Regex Pattern)',
        group: 'Relational Operator',
        type: SelectionOptionType.ComparisonOperator,
        categories: [
          'field',
          'predefined',
          'free-response-field',
          'text-input-field'
        ]
      },
      {
        value: 'not_match',
        label: 'Not Match (Regex Pattern)',
        group: 'Relational Operator',
        type: SelectionOptionType.ComparisonOperator,
        categories: [
          'field',
          'predefined',
          'free-response-field',
          'text-input-field'
        ]
      }
    ]
  }
]

const COMPARISON_TYPES: FormBuilderSelectionOption[] = [
  {
    type: SelectionOptionType.ComparisonType,
    value: 'thisItemValue',
    label: 'This Items Value'
  },
  {
    type: SelectionOptionType.ComparisonType,
    value: 'differentFieldAnswer',
    label: 'Different Field Answer'
  },
  {
    type: SelectionOptionType.ComparisonType,
    value: 'listOfItems',
    label: 'List of Items'
  },
  {
    type: SelectionOptionType.ComparisonType,
    value: 'condition',
    label: 'Another Condition'
  },
  {
    type: SelectionOptionType.ComparisonType,
    value: 'predefined',
    label: 'Predefined Value'
  },
  {
    type: SelectionOptionType.ComparisonType,
    value: 'token',
    label: 'Token Value'
  }
]

const DEFAULT_FORM_BUILDER_SELECTION_CONFIGURATION: FormBuilderSelectionOption = {
  value: '',
  label: 'Base',
  type: SelectionOptionType.Base,
  options: [
    ...COMPLEX_OBJECT,
    ...DISPLAY_CONTENT,
    ...FREE_RESPONSE_FIELDS,
    ...MULTIPLE_CHOICE_FIELDS,
    ...FORM_TYPES,
    ...TOKEN_CATEGORIES,
    ...TOKEN_TYPES,
    ...COMPARISON_OPERATORS,
    ...COMPARISON_TYPES,
    {
      type: SelectionOptionType.HideComparisonSource,
      value: 'field',
      label: 'Different Field Answer',
      category: 'field'
    },
    {
      type: SelectionOptionType.HideComparisonSource,
      value: 'token',
      label: 'Token Value',
      category: 'token'
    },
    {
      type: SelectionOptionType.HideComparisonAgainst,
      value: 'options',
      label: 'List of Options',
      category: 'options'
    },
    {
      type: SelectionOptionType.HideComparisonAgainst,
      value: 'predefined',
      label: 'Value',
      category: 'predefined'
    }
  ]
}

export const getDefaultSelectionOptionsMap = (): { [key in SelectionOptionType]: FormBuilderSelectionOption[] } => ({
  [SelectionOptionType.Base]: buildSelectionOptions(DEFAULT_FORM_BUILDER_SELECTION_CONFIGURATION, SelectionOptionType.Base),
  [SelectionOptionType.FieldCategory]: buildSelectionOptions(DEFAULT_FORM_BUILDER_SELECTION_CONFIGURATION, SelectionOptionType.FieldCategory),
  [SelectionOptionType.FieldType]: buildSelectionOptions(DEFAULT_FORM_BUILDER_SELECTION_CONFIGURATION, SelectionOptionType.FieldType),
  [SelectionOptionType.FieldSubType]: buildSelectionOptions(DEFAULT_FORM_BUILDER_SELECTION_CONFIGURATION, SelectionOptionType.FieldSubType),
  [SelectionOptionType.Form]: buildSelectionOptions(DEFAULT_FORM_BUILDER_SELECTION_CONFIGURATION, SelectionOptionType.Form),
  [SelectionOptionType.ComparisonOperator]: buildSelectionOptions(DEFAULT_FORM_BUILDER_SELECTION_CONFIGURATION, SelectionOptionType.ComparisonOperator),
  [SelectionOptionType.ComparisonType]: buildSelectionOptions(DEFAULT_FORM_BUILDER_SELECTION_CONFIGURATION, SelectionOptionType.ComparisonType),
  [SelectionOptionType.HideComparisonSource]: buildSelectionOptions(DEFAULT_FORM_BUILDER_SELECTION_CONFIGURATION, SelectionOptionType.HideComparisonSource),
  [SelectionOptionType.HideComparisonAgainst]: buildSelectionOptions(DEFAULT_FORM_BUILDER_SELECTION_CONFIGURATION, SelectionOptionType.HideComparisonAgainst),
  [SelectionOptionType.TokenCategory]: buildSelectionOptions(DEFAULT_FORM_BUILDER_SELECTION_CONFIGURATION, SelectionOptionType.TokenCategory),
  [SelectionOptionType.TokenType]: buildSelectionOptions(DEFAULT_FORM_BUILDER_SELECTION_CONFIGURATION, SelectionOptionType.TokenType),
})
