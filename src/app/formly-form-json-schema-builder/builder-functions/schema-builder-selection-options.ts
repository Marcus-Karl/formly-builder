
export enum SelectionOptionType {
  Base = 'Base',
  FieldCategory = 'FieldCategory',
  FieldType = 'FieldType',
  FieldSubType = 'FieldSubType',
  Form = 'Form',
  ComparisonOperator = 'ComparisonOperator',
  ComparisonType = 'ComparisonType',
  HideComparisonSource = 'HideComparisonSource',
  HideComparisonAgainst = 'HideComparisonAgainst',
  TokenCategory = 'TokenCategory',
  TokenType = 'TokenType'
}

export interface SelectionOption {
  category: string | string[] | null;
  group: string | null;
  label: string;
  value: string;
}

export interface FormBuilderSelectionOption {
  category?: string | string[];
  group?: string;
  key: string;
  label: string;
  type: SelectionOptionType;
  values?: FormBuilderSelectionOption[];
}

export const buildSelectionOptions = (item: FormBuilderSelectionOption, type: SelectionOptionType): SelectionOption[] => {
  let options = buildObject(null, item, type);

  return options.filter(x => x.value);
}

const buildObject = (parent: FormBuilderSelectionOption | null, item: FormBuilderSelectionOption, type: SelectionOptionType): SelectionOption[] => {
  let result = item.values?.map(x => buildObject(item, x, type)) as SelectionOption[][];

  let itemsToReturn: SelectionOption[] = ([] as SelectionOption[]).concat(...result ?? []);

  if (item.type === type) {
    itemsToReturn.push({
      category: item.category || parent?.key || null,
      group: item.group || null,
      value: item.key,
      label: item.label,
    });
  }

  return itemsToReturn;
}

const FREE_RESPONSE_FIELDS = {
  key: 'free-response-field',
  label: 'Free Response Field',
  type: SelectionOptionType.FieldCategory,
  values: [
    {
      key: 'currency-input-field',
      label: 'Currency',
      type: SelectionOptionType.FieldType,
    },
    {
      key: 'date-input-field',
      label: 'Date',
      type: SelectionOptionType.FieldType,
    },
    {
      key: 'date-time-input-field',
      label: 'Date & Time',
      type: SelectionOptionType.FieldType,
    },
    {
      key: 'email-input-field',
      label: 'Email',
      type: SelectionOptionType.FieldType,
    },
    {
      key: 'number-input-field',
      label: 'Number',
      type: SelectionOptionType.FieldType,
    },
    {
      key: 'phone-input-field',
      label: 'Telephone',
      type: SelectionOptionType.FieldType,
    },
    {
      key: 'text-input-field',
      label: 'Text',
      type: SelectionOptionType.FieldType,
    },
    {
      key: 'textbox-field',
      label: 'Textbox',
      type: SelectionOptionType.FieldType,
    }
  ]
}

const MULTIPLE_CHOICE_FIELDS = {
  key: 'multiple-choice-field',
  label: 'Multiple Choice Field',
  type: SelectionOptionType.FieldCategory,
  values: [
    {
      type: SelectionOptionType.FieldType,
      key: 'select-autocomplete-field',
      label: 'Auto Complete Select Field'
    },
    {
      type: SelectionOptionType.FieldType,
      key: 'select-dropdown-field',
      label: 'Dropdown Select Field'
    },
    {
      type: SelectionOptionType.FieldType,
      key: 'radio-button-field',
      label: 'Radio Button Field'
    }
  ]
}

const FORM_TYPES = {
  key: 'form',
  label: 'Form Types',
  type: SelectionOptionType.FieldCategory,
  values: [
    {
      key: 'default-form',
      label: 'Default Form',
      type: SelectionOptionType.Form,
    },
    {
      key: 'page-form',
      label: 'Page Form',
      type: SelectionOptionType.Form,
    },
    {
      key: 'stepper-form',
      label: 'Step Form',
      type: SelectionOptionType.Form,
    },
    {
      key: 'tab-form',
      label: 'Tab Form',
      type: SelectionOptionType.Form,
    }
  ]
}

const COMPLEX_OBJECT = {
  key: 'complex-object-field',
  label: 'Complex Object',
  type: SelectionOptionType.FieldCategory,
  category: 'field',
  values: [
    {
      type: SelectionOptionType.FieldType,
      key: 'complex-object',
      label: 'Complex Object'
    }
  ]
}

const DISPLAY_CONTENT = {
  key: 'display-content-field',
  label: 'Display Content',
  type: SelectionOptionType.FieldCategory,
  category: 'display',
  values: [
    {
      type: SelectionOptionType.FieldType,
      key: 'display-html',
      label: 'Display Content'
    }
  ]
}

const TOKEN_CATEGORIES = [
  {
    key: 'answer-based',
    label: 'Answer Based',
    type: SelectionOptionType.TokenCategory
  },
  {
    key: 'dispute',
    label: 'Dispute',
    type: SelectionOptionType.TokenCategory
  },
  {
    key: 'site',
    label: 'Site Information',
    type: SelectionOptionType.TokenCategory
  },
  {
    key: 'static',
    label: 'Static',
    type: SelectionOptionType.TokenCategory
  }
]

const TOKEN_TYPES = [
  {
    key: 'date',
    label: 'Date',
    type: SelectionOptionType.TokenType
  },
  {
    key: 'datetime',
    label: 'Date & Time',
    type: SelectionOptionType.TokenType
  },
  {
    key: 'externalLink',
    label: 'External URL',
    type: SelectionOptionType.TokenType
  },
  {
    key: 'function',
    label: 'Function',
    type: SelectionOptionType.TokenType
  },
  {
    key: 'siteLink',
    label: 'Page Link',
    type: SelectionOptionType.TokenType
  }
]

const COMPARISON_OPERATORS = {
  key: '',
  label: 'Operators',
  type: SelectionOptionType.ComparisonOperator,
  values: [
    {
      key: '>',
      label: '> (Greater Than)',
      group: 'Comparison Operators',
      type: SelectionOptionType.ComparisonOperator,
      category: [
        'field',
        'predefined',
        'currency-input-field',
        'number-input-field'
      ]
    },
    {
      key: '>=',
      label: '>= (Greater Than or Equal)',
      group: 'Comparison Operators',
      type: SelectionOptionType.ComparisonOperator,
      category: [
        'field',
        'predefined',
        'currency-input-field',
        'number-input-field'
      ]
    },
    {
      key: '<',
      label: '< (Less Than)',
      group: 'Comparison Operators',
      type: SelectionOptionType.ComparisonOperator,
      category: [
        'field',
        'predefined',
        'currency-input-field',
        'number-input-field'
      ]
    },
    {
      key: '<=',
      label: '<= (Less Than or Equal)',
      group: 'Comparison Operators',
      type: SelectionOptionType.ComparisonOperator,
      category: [
        'field',
        'predefined',
        'currency-input-field',
        'number-input-field'
      ]
    },
    {
      key: '==',
      label: '== (Equal)',
      group: 'Comparison Operators',
      type: SelectionOptionType.ComparisonOperator,
      category: [
        'field',
        'predefined',
        'currency-input-field',
        'number-input-field'
      ]
    },
    {
      key: '!=',
      label: '!= (Not Equal)',
      group: 'Comparison Operators',
      type: SelectionOptionType.ComparisonOperator,
      category: [
        'field',
        'predefined',
        'currency-input-field',
        'number-input-field'
      ]
    },
    {
      key: '&&',
      label: '&& (And)',
      group: 'Logical Operators',
      type: SelectionOptionType.ComparisonOperator
    },
    {
      key: '||',
      label: '|| (Or)',
      group: 'Logical Operators',
      type: SelectionOptionType.ComparisonOperator
    },
    {
      key: '!',
      label: '! (Not)',
      group: 'Logical Operators',
      type: SelectionOptionType.ComparisonOperator
    },
    {
      key: 'in',
      label: 'In (Value Is In)',
      group: 'Relational Operator',
      type: SelectionOptionType.ComparisonOperator,
      category: [
        'field',
        'multiple-choice-field',
        'currency-input-field'
      ]
    },
    {
      key: 'notin',
      label: 'Not In (Value Is Not In)',
      group: 'Relational Operator',
      type: SelectionOptionType.ComparisonOperator,
      category: [
        'field',
        'multiple-choice-field',
        'currency-input-field'
      ]
    },
    {
      key: 'between_exclusive',
      label: 'Between Exclusive (Between But Not Equal To)',
      group: 'Relational Operator',
      type: SelectionOptionType.ComparisonOperator,
      category: [
        'field',
        'currency-input-field',
        'number-input-field'
      ]
    },
    {
      key: 'between_inclusive',
      label: 'Between Inclusive (Between Or Equal To)',
      group: 'Relational Operator',
      type: SelectionOptionType.ComparisonOperator,
      category: [
        'field',
        'currency-input-field',
        'number-input-field'
      ]
    },
    {
      key: 'match',
      label: 'Matches (Regex Pattern)',
      group: 'Relational Operator',
      type: SelectionOptionType.ComparisonOperator,
      category: [
        'field',
        'predefined',
        'free-response-field',
        'text-input-field'
      ]
    },
    {
      key: 'not_match',
      label: 'Not Match (Regex Pattern)',
      group: 'Relational Operator',
      type: SelectionOptionType.ComparisonOperator,
      category: [
        'field',
        'predefined',
        'free-response-field',
        'text-input-field'
      ]
    }
  ]
}

const COMPARISON_TYPES = [
  {
    type: SelectionOptionType.ComparisonType,
    key: 'thisItemValue',
    label: 'This Items Value'
  },
  {
    type: SelectionOptionType.ComparisonType,
    key: 'differentFieldAnswer',
    label: 'Different Field Answer'
  },
  {
    type: SelectionOptionType.ComparisonType,
    key: 'listOfItems',
    label: 'List of Items'
  },
  {
    type: SelectionOptionType.ComparisonType,
    key: 'condition',
    label: 'Another Condition'
  },
  {
    type: SelectionOptionType.ComparisonType,
    key: 'predefined',
    label: 'Predefined Value'
  },
  {
    type: SelectionOptionType.ComparisonType,
    key: 'token',
    label: 'Token Value'
  }
]

const DEFAULT_FORM_BUILDER_SELECTION_CONFIGURATION: FormBuilderSelectionOption = {
  key: '',
  label: 'Base',
  type: SelectionOptionType.Base,
  values: [
    COMPLEX_OBJECT,
    DISPLAY_CONTENT,
    FREE_RESPONSE_FIELDS,
    MULTIPLE_CHOICE_FIELDS,
    FORM_TYPES,
    ...TOKEN_CATEGORIES,
    ...TOKEN_TYPES,
    COMPARISON_OPERATORS,
    ...COMPARISON_TYPES,
    {
      type: SelectionOptionType.HideComparisonSource,
      key: 'field',
      label: 'Different Field Answer',
      category: 'field'
    },
    {
      type: SelectionOptionType.HideComparisonSource,
      key: 'token',
      label: 'Token Value',
      category: 'token'
    },
    {
      type: SelectionOptionType.HideComparisonAgainst,
      key: 'options',
      label: 'List of Options',
      category: 'options'
    },
    {
      type: SelectionOptionType.HideComparisonAgainst,
      key: 'predefined',
      label: 'Value',
      category: 'predefined'
    }
  ]
}

export const DEFAULT_SELECTION_OPTIONS_MAP: { [key in SelectionOptionType]: SelectionOption[] } = {
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
}
