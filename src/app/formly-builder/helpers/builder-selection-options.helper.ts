
export enum SelectionOptionType {
  Base = 'Base',
  FieldCategory = 'FieldCategory',
  FieldType = 'FieldType',
  FieldSubType = 'FieldSubType',
  Form = 'Form',
  StatementComparisonOperator = 'StatementComparisonOperator',
  StatementComparisonType = 'ComparisonType',
  TokenCategory = 'TokenCategory',
  TokenType = 'TokenType'
}

export interface SelectionOption {
  category: string | null;
  group: string | null;
  label: string;
  value: string;
}

export interface FormBuilderSelectionOption {
  category?: string;
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

  let itemsToReturn: SelectionOption[] = ([] as SelectionOption[]).concat(...result || []);

  if (item.type === type) {
    itemsToReturn.push({
      category: parent?.key || null,
      group: item.group || null,
      value: item.key,
      label: item.label,
    });
  }

  return itemsToReturn;
}

const DEFAULT_FORM_BUILDER_SELECTION_CONFIGURATION: FormBuilderSelectionOption = {
  key: '',
  label: 'Base',
  type: SelectionOptionType.Base,
  values: [
    {
      key: 'display-content-field',
      label: 'Display Content',
      type: SelectionOptionType.FieldCategory,
      values: [
        {
          type: SelectionOptionType.FieldType,
          key: 'display-html',
          label: 'Display Content'
        }
      ]
    },
    {
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
          key: 'text-input-field',
          label: 'Date',
          type: SelectionOptionType.FieldType,
        },
        {
          key: 'text-input-field',
          label: 'Date & Time',
          type: SelectionOptionType.FieldType,
        },
        {
          key: 'text-input-field',
          label: 'Email',
          type: SelectionOptionType.FieldType,
        },
        {
          key: 'number-input-field',
          label: 'Number',
          type: SelectionOptionType.FieldType,
        },
        {
          key: 'text-input-field',
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
    },
    {
      key: 'multiple-choice-field',
      label: 'Multiple Choice Field',
      type: SelectionOptionType.FieldCategory,
      values: [
        {
          type: SelectionOptionType.FieldType,
          key: 'select-dropdown-field',
          label: 'Dropdown Field'
        }
      ]
    },
    {
      key: 'form',
      label: 'Nested Form',
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
    },
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
    },
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
    },
    {
      key: '',
      label: 'Operators',
      type: SelectionOptionType.StatementComparisonOperator,
      values: [
        {
          key: '>',
          label: '> (Greater Than)',
          group: 'Comparison Operators',
          type: SelectionOptionType.StatementComparisonOperator,
        },
        {
          key: '>=',
          label: '>= (Greater Than or Equal)',
          group: 'Comparison Operators',
          type: SelectionOptionType.StatementComparisonOperator,
        },
        {
          key: '<',
          label: '< (Less Than)',
          group: 'Comparison Operators',
          type: SelectionOptionType.StatementComparisonOperator,
        },
        {
          key: '<=',
          label: '<= (Less Than or Equal)',
          group: 'Comparison Operators',
          type: SelectionOptionType.StatementComparisonOperator,
        },
        {
          key: '==',
          label: '== (Equal)',
          group: 'Comparison Operators',
          type: SelectionOptionType.StatementComparisonOperator,
        },
        {
          key: '!=',
          label: '!= (Not Equal)',
          group: 'Comparison Operators',
          type: SelectionOptionType.StatementComparisonOperator,
        },
        {
          key: '&&',
          label: '&& (And)',
          group: 'Logical Operators',
          type: SelectionOptionType.StatementComparisonOperator
        },
        {
          key: '||',
          label: '|| (Or)',
          group: 'Logical Operators',
          type: SelectionOptionType.StatementComparisonOperator
        },
        {
          key: '!',
          label: '! (Not)',
          group: 'Logical Operators',
          type: SelectionOptionType.StatementComparisonOperator
        },
        {
          key: 'in',
          label: 'In (Value Is In)',
          group: 'Relational Operator',
          type: SelectionOptionType.StatementComparisonOperator
        },
        {
          key: 'notin',
          label: 'Not In (Value Is Not In)',
          group: 'Relational Operator',
          type: SelectionOptionType.StatementComparisonOperator
        },
        {
          key: 'between_exclusive',
          label: 'Between Exclusive (Between But Not Equal To)',
          group: 'Relational Operator',
          type: SelectionOptionType.StatementComparisonOperator
        },
        {
          key: 'between_inclusive',
          label: 'Between Inclusive (Between Or Equal To)',
          group: 'Relational Operator',
          type: SelectionOptionType.StatementComparisonOperator
        },
        {
          key: 'match',
          label: 'Matches (Regex Pattern)',
          group: 'Relational Operator',
          type: SelectionOptionType.StatementComparisonOperator
        },
        {
          key: 'not_match',
          label: 'Not Match (Regex Pattern)',
          group: 'Relational Operator',
          type: SelectionOptionType.StatementComparisonOperator
        }
      ]
    },
    {
      type: SelectionOptionType.StatementComparisonType,
      key: 'thisItemValue',
      label: 'This Items Value'
    },
    {
      type: SelectionOptionType.StatementComparisonType,
      key: 'differentFieldAnswer',
      label: 'Different Field Answer'
    },
    {
      type: SelectionOptionType.StatementComparisonType,
      key: 'condition',
      label: 'Another Condition'
    },
    {
      type: SelectionOptionType.StatementComparisonType,
      key: 'predefined',
      label: 'Predefined Value'
    },
    {
      type: SelectionOptionType.StatementComparisonType,
      key: 'token',
      label: 'Token Value'
    }
  ]
}

export const DEFAULT_SELECTION_OPTIONS_MAP: { [key in SelectionOptionType]: SelectionOption[] } = {
  [SelectionOptionType.Base]: buildSelectionOptions(DEFAULT_FORM_BUILDER_SELECTION_CONFIGURATION, SelectionOptionType.Base),
  [SelectionOptionType.FieldCategory]: buildSelectionOptions(DEFAULT_FORM_BUILDER_SELECTION_CONFIGURATION, SelectionOptionType.FieldCategory),
  [SelectionOptionType.FieldType]: buildSelectionOptions(DEFAULT_FORM_BUILDER_SELECTION_CONFIGURATION, SelectionOptionType.FieldType),
  [SelectionOptionType.FieldSubType]: buildSelectionOptions(DEFAULT_FORM_BUILDER_SELECTION_CONFIGURATION, SelectionOptionType.FieldSubType),
  [SelectionOptionType.Form]: buildSelectionOptions(DEFAULT_FORM_BUILDER_SELECTION_CONFIGURATION, SelectionOptionType.Form),
  [SelectionOptionType.StatementComparisonOperator]: buildSelectionOptions(DEFAULT_FORM_BUILDER_SELECTION_CONFIGURATION, SelectionOptionType.StatementComparisonOperator),
  [SelectionOptionType.StatementComparisonType]: buildSelectionOptions(DEFAULT_FORM_BUILDER_SELECTION_CONFIGURATION, SelectionOptionType.StatementComparisonType),
  [SelectionOptionType.TokenCategory]: buildSelectionOptions(DEFAULT_FORM_BUILDER_SELECTION_CONFIGURATION, SelectionOptionType.TokenCategory),
  [SelectionOptionType.TokenType]: buildSelectionOptions(DEFAULT_FORM_BUILDER_SELECTION_CONFIGURATION, SelectionOptionType.TokenType),
}
