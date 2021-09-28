import { SelectionOption, SelectionOptionType } from './builder-selection-options.helper';

export const defaultJsonSchema = (selectionOptionsMap: { [key in SelectionOptionType]: SelectionOption[] }) => ({
  'type': 'object',
  'properties': {
    'form': {
      '$ref': '#/definitions/form/root-form'
    },
  },
  'required': [
    'form'
  ],
  'definitions': {
    'form': {
      'root-form': {
        'type': 'object',
        'widget': {
          'formlyConfig': {
            'type': 'stepper-form',
            'defaultValue': {},
            'templateOptions': {
              'linear': false
            }
          }
        },
        'properties': {
          'pages': {
            '$ref': '#/definitions/form/tabs/page'
          },
          'tokens': {
            '$ref': '#/definitions/form/tabs/tokens'
          },
          'settings': {
            '$ref': '#/definitions/form/tabs/settings'
          }
        },
        'required': [
          'pages',
          'settings'
        ]
      },
      'tabs': {
        'page': {
          'type': 'array',
          'title': 'Pages',
          'minItems': 1,
          'widget': {
            'formlyConfig': {
              'type': 'form-editor',
              'defaultValue': [],
              'className': 'pad-bottom flex column',
            }
          },
          'items': {
            'type': 'object',
            'widget': {
              'formlyConfig': {
                'type': 'page-form',
                'defaultValue': {},
                'templateOptions': {
                  'useSmallButtons': true,
                  'hideSubmit': true,
                  'linear': false
                }
              }
            },
            'properties': {
              'fields': {
                '$ref': '#/definitions/page/fields'
              },
              'settings': {
                '$ref': '#/definitions/page/settings'
              }
            },
            'required': [
              'fields',
              'settings'
            ]
          }
        },
        'settings': {
          'type': 'object',
          'title': 'Settings',
          'properties': {
            'formType': {
              'type': 'string',
              'title': 'Form Type',
              'widget': {
                'formlyConfig': {
                  'type': 'select',
                  'defaultValue': '',
                  'templateOptions': {
                    'options': selectionOptionsMap[SelectionOptionType.Form]
                  }
                }
              }
            },
            'name': {
              'type': 'string',
              'title': 'Form Name',
              'widget': {
                'formlyConfig': {
                  'type': 'input',
                  'defaultValue': '',
                  'hide': true
                }
              }
            },
            'label': {
              'type': 'string',
              'title': 'Form Label',
              'widget': {
                'formlyConfig': {
                  'type': 'input',
                  'defaultValue': ''
                }
              }
            }
          },
          'required': [
            'formType',
            'label'
          ]
        },
        'tokens': {
          'type': 'array',
          'title': 'Tokens',
          'minItems': 0,
          'widget': {
            'formlyConfig': {
              'type': 'token-page',
              'defaultValue': []
            }
          },
          'items': {
            'type': 'object',
            'widget': {
              'formlyConfig': {
                'type': 'tab-form',
                'defaultValue': {},
                'templateOptions': {
                  'hideButtons': true
                }
              }
            },
            'properties': {
              'category': {
                '$ref': '#/definitions/token/fields/category'
              },
              'basic': {
                '$ref': '#/definitions/token/tabs/basic'
              },
              'advanced': {
                '$ref': '#/definitions/token/tabs/advanced'
              }
            },
            'required': [
              'category'
            ]
          }
        }
      }
    },
    'page': {
      'settings': {
        'type': 'object',
        'title': 'Page Settings',
        'widget': {
          'formlyConfig': {
            'defaultValue': {},
            'className': 'formly-build-page-form-min-height flex column',
            'templateOptions': {
              'isOptional': true
            }
          }
        },
        'properties': {
          'name': {
            'type': 'string',
            'title': 'Page Name',
            'widget': {
              'formlyConfig': {
                'type': 'input',
                'defaultValue': '',
                'hide': true
              }
            }
          },
          'label': {
            'type': 'string',
            'title': 'Page Label',
            'className': 'margin-top',
            'widget': {
              'formlyConfig': {
                'type': 'input',
                'defaultValue': ''
              }
            }
          },
          'hideExpression': {
            'type': 'array',
            'title': 'Create rule to conditionally hide this page',
            'widget': {
              'formlyConfig': {
                'defaultValue': [],
                'type': 'expression-builder',
                'hide': true
              }
            },
            'items': {
              '$ref': '#/definitions/expression/baseCondition'
            }
          }
        },
        'required': [
          'label'
        ]
      },
      'fields': {
        'type': 'array',
        'title': 'Fields',
        'minItems': 1,
        'widget': {
          'formlyConfig': {
            'className': 'formly-build-page-form-min-height flex column',
            'type': 'page-fields',
            'defaultValue': [],
            'templateOptions': {
              'hideLabel': true
            }
          }
        },
        'items': {
          '$ref': '#/definitions/field/picker'
        }
      }
    },
    'field': {
      'picker': {
        'type': 'object',
        'widget': {
          'formlyConfig': {
            'type': 'tab-form',
            'defaultValue': {},
            'templateOptions': {
              'hideButtons': true,
              'linear': false
            }
          }
        },
        'properties': {
          'category': {
            '$ref': '#/definitions/field/types/category'
          },
          'basic': {
            '$ref': '#/definitions/field/tabs/basic'
          },
          'options': {
            '$ref': '#/definitions/field/tabs/options'
          },
          'extra': {
            '$ref': '#/definitions/field/tabs/extra'
          },
          'edit': {
            '$ref': '#/definitions/field/tabs/edit-display-content'
          },
          'preview': {
            '$ref': '#/definitions/field/tabs/preview-display-content'
          },
          'advanced': {
            '$ref': '#/definitions/field/tabs/advanced'
          }
        },
        'required': [
          'category'
        ]
      },
      'tabs': {
        'edit-display-content': {
          'type': 'string',
          'title': 'Edit Content',
          'widget': {
            'formlyConfig': {
              'type': 'display-html-editor',
              'defaultValue': '',
              'className': 'pad-half formly-field fill-height',
              'hideExpression': 'field.model.category !== \'display-content-field\''
            }
          }
        },
        'preview-display-content': {
          'type': 'null',
          'title': 'Content Preview',
          'widget': {
            'formlyConfig': {
              'type': 'display-html',
              'className': 'pad-half formly-field',
              'templateOptions': {
                'html': ''
              },
              'expressionProperties': {
                'templateOptions.html': 'field.model.edit || \'\''
              },
              'hideExpression': 'field.model.category !== \'display-content-field\'',
            }
          }
        },
        'basic': {
          'type': 'object',
          'title': 'Basic Information',
          'widget': {
            'formlyConfig': {
              'defaultValue': {},
              'className': 'flex pad',
              'hideExpression': 'field.parent.model.category === \'display-content-field\'',
              'templateOptions': {
                'isOptional': true
              }
            }
          },
          'properties': {
            'type': {
              '$ref': '#/definitions/field/types/type'
            },
            'subType': {
              '$ref': '#/definitions/field/types/subType'
            },
            'name': {
              '$ref': '#/definitions/field/types/name'
            },
            'label': {
              '$ref': '#/definitions/field/types/label'
            }
          },
          'required': [
            'label',
            'type'
          ]
        },
        'options': {
          'type': 'array',
          'title': 'Configure Options',
          'minItems': 1,
          'widget': {
            'formlyConfig': {
              'type': 'options-editor',
              'defaultValue': [],
              'hideExpression': 'field.parent.model.category !== \'multiple-choice-field\'',
              'templateOptions': {
                'isOptional': true
              },
            }
          },
          'items': {
            'type': 'object',
            'properties': {
              'value': {
                'type': 'string',
                'widget': {
                  'formlyConfig': {
                    'type': 'input',
                    'defaultValue': '',
                    'templateOptions': {
                      'placeholder': 'Enter a name...'
                    }
                  }
                }
              },
              'label': {
                'type': 'string',
                'widget': {
                  'formlyConfig': {
                    'type': 'input',
                    'defaultValue': '',
                    'templateOptions': {
                      'placeholder': 'Enter a label...'
                    }
                  }
                }
              }
            },
            'required': [
              'value',
              'label'
            ]
          }
        },
        'extra': {
          'type': 'object',
          'title': 'Extras',
          'widget': {
            'formlyConfig': {
              'defaultValue': {},
              'className': 'flex pad',
              'hideExpression': 'field.parent.model.category === \'display-content-field\'',
              'templateOptions': {
                'isOptional': true
              }
            }
          },
          'properties': {
            'defaultValue': {
              '$ref': '#/definitions/field/types/defaultValue'
            },
            'placeholder': {
              '$ref': '#/definitions/field/types/placeholder'
            },
            'hint': {
              '$ref': '#/definitions/field/types/hint'
            },
            'help': {
              '$ref': '#/definitions/field/types/help'
            }
          }
        },
        'advanced': {
          'type': 'object',
          'title': 'Advanced',
          'widget': {
            'formlyConfig': {
              'defaultValue': {},
              'className': 'flex pad',
              'templateOptions': {
                'isOptional': true
              }
            }
          },
          'properties': {
            'hideExpression': {
              '$ref': '#/definitions/field/types/hideExpression'
            },
            'validationExpressions': {
              '$ref': '#/definitions/field/types/validationExpressions'
            }
          }
        }
      },
      'types': {
        'hideExpression': {
          'type': 'array',
          'title': 'Create rule to conditionally hide this field',
          'widget': {
            'formlyConfig': {
              'defaultValue': [],
              'type': 'expression-builder'
            }
          },
          'items': {
            '$ref': '#/definitions/expression/baseCondition'
          }
        },
        'validationExpressions': {
          'type': 'array',
          'title': 'Create rule to validate user entries',
          'widget': {
            'formlyConfig': {
              'defaultValue': [],
              'type': 'expression-builder',
              'hideExpression': 'field.parent.parent.model.category === \'display-content-field\'',
            }
          },
          'items': {
            '$ref': '#/definitions/expression/baseCondition'
          }
        },
        'category': {
          'type': 'string',
          'title': 'Select Base Field Type',
          'widget': {
            'formlyConfig': {
              'type': 'select',
              'defaultValue': '',
              'templateOptions': {
                'options': selectionOptionsMap[SelectionOptionType.FieldCategory]
              },
              'hideExpression': '!!model.category'
            }
          }
        },
        'name': {
          'type': 'string',
          'title': 'Field Name',
          'widget': {
            'formlyConfig': {
              'type': 'input',
              'defaultValue': ''
            }
          }
        },
        'label': {
          'type': 'string',
          'title': 'Field Label',
          'widget': {
            'formlyConfig': {
              'type': 'input',
              'defaultValue': ''
            }
          }
        },
        'type': {
          'type': 'string',
          'title': 'Field Type',
          'widget': {
            'formlyConfig': {
              'type': 'select',
              'defaultValue': '',
              'templateOptions': {
                'options': selectionOptionsMap[SelectionOptionType.FieldType]
              },
              'expressionProperties': {
                'templateOptions.options': 'field.templateOptions._options.filter(x => x.category === field.parent.parent.model.category)',
                'model.type': 'field.templateOptions.options?.find(x => x.value === model.type) ? model.type : undefined',
              }
            }
          }
        },
        'subType': {
          'type': 'string',
          'title': 'Sub Field Type',
          'widget': {
            'formlyConfig': {
              'type': 'select',
              'defaultValue': '',
              'templateOptions': {
                'options': selectionOptionsMap[SelectionOptionType.FieldSubType]
              },
              'expressionProperties': {
                'templateOptions.options': 'field.templateOptions._options.filter(x => x.category === model.type)',
                'model.subType': 'field.templateOptions.options?.find(x => x.value === field.model.subType) ? field.model.subType : undefined',
              },
              'hideExpression': '!field.templateOptions.options?.length',
            }
          }
        },
        'placeholder': {
          'type': 'string',
          'title': 'Placeholder Text',
          'widget': {
            'formlyConfig': {
              'type': 'input',
              'defaultValue': ''
            }
          }
        },
        'hint': {
          'type': 'string',
          'title': 'Hint Text',
          'widget': {
            'formlyConfig': {
              'type': 'input',
              'defaultValue': ''
            }
          }
        },
        'defaultValue': {
          'type': 'string',
          'title': 'Default Value',
          'widget': {
            'formlyConfig': {
              'type': 'input',
              'defaultValue': ''
            }
          }
        },
        'help': {
          'type': 'string',
          'title': 'Help Text',
          'widget': {
            'formlyConfig': {
              'type': 'input',
              'defaultValue': ''
            }
          }
        }
      }
    },
    'token': {
      'tabs': {
        'basic': {
          'type': 'object',
          'title': 'Token',
          'widget': {
            'formlyConfig': {
              'className': 'formly-field-tab',
              'defaultValue': {}
            }
          },
          'properties': {
            'fieldReference': {
              '$ref': '#/definitions/token/fields/fieldReference'
            },
            'tokenName': {
              '$ref': '#/definitions/token/fields/tokenName'
            },
            'tokenType': {
              '$ref': '#/definitions/token/fields/tokenType'
            },
            'tokenSubType': {
              '$ref': '#/definitions/token/fields/tokenSubType'
            }
          }
        },
        'advanced': {
          'type': 'object',
          'title': 'Advanced',
          'widget': {
            'formlyConfig': {
              'className': 'formly-field-tab fill',
              'defaultValue': {}
            }
          },
          'properties': {
            'format': {
              '$ref': '#/definitions/token/fields/format'
            },
            'returnResult': {
              '$ref': '#/definitions/token/fields/returnResult'
            }
          }
        }
      },
      'fields': {
        'returnResult': {
          'type': 'array',
          'title': 'Create condition to return result',
          'maxItems': 1,
          'widget': {
            'formlyConfig': {
              'defaultValue': [],
              'className': 'formly-field fill',
              'type': 'expression-builder'
            }
          },
          'items': {
            '$ref': '#/definitions/expression/baseCondition'
          }
        },
        'category': {
          'type': 'string',
          'title': 'Select Token Type',
          'widget': {
            'formlyConfig': {
              'type': 'select',
              'defaultValue': '',
              'templateOptions': {
                'options': selectionOptionsMap[SelectionOptionType.TokenCategory]
              },
              'hideExpression': 'true'
            }
          }
        },
        'format': {
          'type': 'string',
          'title': 'Custom Format',
          'widget': {
            'formlyConfig': {
              'className': 'formly-field',
              'type': 'input',
              'defaultValue': ''
            }
          }
        },
        'fieldReference': {
          'type': 'string',
          'title': 'Field Reference',
          'widget': {
            'formlyConfig': {
              'type': 'select',
              'defaultValue': '',
              'templateOptions': {
                'options': []
              },
              'hideExpression': 'field.parent.parent.model.category !== \'answer-based\'',
              'validators': {
                'validation': ['valid-name']
              }
            }
          }
        },
        'tokenName': {
          'type': 'string',
          'title': 'Token Name/Identifier',
          'widget': {
            'formlyConfig': {
              'type': 'input',
              'defaultValue': '',
              'className': 'formly-field',
              'validators': {
                'validation': [
                  'valid-name'
                ]
              }
            }
          }
        },
        'tokenType': {
          'type': 'string',
          'title': 'Token Type',
          'widget': {
            'formlyConfig': {
              'type': 'input',
              'defaultValue': '',
              'expressionProperties': {
                'model.tokenType': 'field.options.formState.builder.functions.getFieldTypeForReference(field.options.formState, model.fieldReference)',
              },
              'hideExpression': 'true'
            }
          }
        },
        'tokenSubType': {
          'type': 'string',
          'title': 'Token Sub Type',
          'widget': {
            'formlyConfig': {
              'type': 'input',
              'defaultValue': '',
              'expressionProperties': {
                'model.tokenSubType': 'field.options.formState.builder.functions.getFieldSubTypeForReference(field.options.formState, model.fieldReference)',
              },
              'hideExpression': 'true'
            }
          }
        }
      }
    },
    'expression': {
      'nestedCondition': {
        'type': 'array',
        'widget': {
          'formlyConfig': {
            'defaultValue': [],
            'type': 'operator-condition',
            'hideExpression': 'field.parent.model.comparisonAgainst !== \'condition\''
          }
        },
        'items': {
          '$ref': '#/definitions/expression/baseCondition'
        }
      },
      'baseCondition': {
        'type': 'object',
        'widget': {
          'formlyConfig': {
            'defaultValue': {}
          }
        },
        'properties': {
          'operator': {
            '$ref': '#/definitions/expression/operator'
          },
          'leftHandSide': {
            '$ref': '#/definitions/expression/operatorSide'
          },
          'rightHandSide': {
            '$ref': '#/definitions/expression/operatorSide'
          }
        },
        'required': [
          'operator',
          'leftHandSide',
          'rightHandSide'
        ]
      },
      'operatorSide': {
        'type': 'object',
        'title': 'Compare Against',
        'widget': {
          'formlyConfig': {
            'defaultValue': {}
          }
        },
        'properties': {
          'comparisonAgainst': {
            '$ref': '#/definitions/expression/comparisonAgainst'
          },
          'predefined': {
            '$ref': '#/definitions/expression/predefined'
          },
          'condition': {
            '$ref': '#/definitions/expression/nestedCondition'
          },
          'token': {
            '$ref': '#/definitions/expression/token'
          }
        },
        'required': [
          'operator'
        ]
      },
      'operator': {
        'type': 'string',
        'title': 'Operator',
        'widget': {
          'formlyConfig': {
            'type': 'select',
            'defaultValue': '',
            'templateOptions': {
              'options': selectionOptionsMap[SelectionOptionType.StatementComparisonOperator]
            }
          }
        }
      },
      'comparisonAgainst': {
        'type': 'string',
        'title': 'Compare Against',
        'widget': {
          'formlyConfig': {
            'type': 'select',
            'defaultValue': '',
            'templateOptions': {
              'options': selectionOptionsMap[SelectionOptionType.StatementComparisonType]
            }
          }
        }
      },
      'token': {
        'type': 'string',
        'title': 'Select Token',
        'widget': {
          'formlyConfig': {
            'type': 'select',
            'defaultValue': '',
            'templateOptions': {
              'options': selectionOptionsMap[SelectionOptionType.StatementComparisonType]
            },
            'hideExpression': 'model.comparisonAgainst !== \'token\''
          }
        }
      },
      'predefined': {
        'type': 'string',
        'title': 'Predefined Value',
        'widget': {
          'formlyConfig': {
            'type': 'input',
            'defaultValue': '',
            'hideExpression': 'model.comparisonAgainst !== \'predefined\''
          }
        }
      }
    }
  }
})
