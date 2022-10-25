import { SelectionOptionType, FormBuilderSelectionOption } from '../models/builder-form-state';

export const defaultJsonSchema = (selectionOptionsMap: { [key in SelectionOptionType]: FormBuilderSelectionOption[] }) => ({
  'type': 'object',
  'properties': {
    'form': {
      '$ref': '#/definitions/rootForm'
    },
  },
  'required': [
    'form'
  ],
  'definitions': {
    'rootForm': {
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
          '$ref': '#/definitions/formPages'
        },
        'settings': {
          '$ref': '#/definitions/formSettings'
        }
      },
      'required': [
        'pages',
        'settings'
      ]
    },
    'formPages': {
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
            '$ref': '#/definitions/pageFields'
          },
          'settings': {
            '$ref': '#/definitions/pageSettings'
          }
        },
        'required': [
          'fields',
          'settings'
        ]
      }
    },
    'formSettings': {
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
    'pageSettings': {
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
              'validators': {
                'validation': [
                  'valid-name'
                ]
              }
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
              'type': 'expression-builder'
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
    'pageFields': {
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
        '$ref': '#/definitions/fieldPicker'
      }
    },
    'fieldPicker': {
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
          '$ref': '#/definitions/fieldTypes/category'
        },
        'basic': {
          '$ref': '#/definitions/fieldTabs/basic'
        },
        'complexObject': {
          '$ref': '#/definitions/fieldTabs/complexObject'
        },
        'options': {
          '$ref': '#/definitions/fieldTabs/options'
        },
        'extra': {
          '$ref': '#/definitions/fieldTabs/extra'
        },
        'edit': {
          '$ref': '#/definitions/fieldTabs/edit-display-content'
        },
        'preview': {
          '$ref': '#/definitions/fieldTabs/preview-display-content'
        },
        'advanced': {
          '$ref': '#/definitions/fieldTabs/advanced'
        }
      },
      'required': [
        'category'
      ],
      'if': {
        'category': 'complex-object-field'
      },
      'then': {
        'properties': {
          'complexObject': {
            'minItems': 1
          }
        }
      }
    },
    'fieldTabs': {
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
            '$ref': '#/definitions/fieldTypes/typeField'
          },
          'subType': {
            '$ref': '#/definitions/fieldTypes/subType'
          },
          'name': {
            '$ref': '#/definitions/fieldTypes/name'
          },
          'label': {
            '$ref': '#/definitions/fieldTypes/label'
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
            'hideExpression': '[\'display-content-field\', \'complex-object-field\'].includes(field.parent.model.category)',
            'templateOptions': {
              'isOptional': true
            }
          }
        },
        'properties': {
          'defaultValue': {
            '$ref': '#/definitions/fieldTypes/defaultValue'
          },
          'placeholder': {
            '$ref': '#/definitions/fieldTypes/placeholder'
          },
          'hint': {
            '$ref': '#/definitions/fieldTypes/hint'
          },
          'help': {
            '$ref': '#/definitions/fieldTypes/help'
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
            '$ref': '#/definitions/fieldTypes/addDependencies'
          },
          'validationExpressions': {
            '$ref': '#/definitions/fieldTypes/validationExpressions'
          }
        }
      },
      'complexObject': {
        'type': 'array',
        'title': 'Configured Fields',
        'minItems': 0,
        'widget': {
          'formlyConfig': {
            'className': 'formly-build-page-form-min-height flex column pad',
            'type': 'page-fields',
            'defaultValue': [],
            'hideExpression': 'field.parent.model.category !== \'complex-object-field\'',
            'templateOptions': {
              'hideLabel': true
            }
          }
        },
        'items': {
          '$ref': '#/definitions/fieldPicker'
        }
      }
    },
    'fieldTypes': {
      'addDependencies': {
        'type': 'array',
        'title': 'Dependencies',
        'widget': {
          'formlyConfig': {
            'defaultValue': [],
            'type': 'dependency-builder'
          }
        },
        'items': {
          'type': 'object',
          "properties": {}
          /*
          'properties': {
            'dependencyIf': {
              'type': 'array',
              'widget': {
                'formlyConfig': {
                  'defaultValue': []
                }
              },
              'items': {
                'type': 'object',
                'properties': {
                  'selection': {
                    'type': 'string',
                    'title': 'Select Field (must be multiple choice)',
                    'widget': {
                      'formlyConfig': {
                        'type': 'select',
                        'defaultValue': '',
                        'templateOptions': {
                          'options': []
                        },
                        'expressionProperties': {
                          'model.referenceId': 'model.selection ? model.selection.split(\'_\')[0] : null',
                          'model.value': 'model.selection ? model.selection.split(\'_\').slice(1).join(\'_\') : null'
                        }
                      }
                    }
                  }
                }
              }
            },
            'dependencyThen': {
              'type': 'array',
              'widget': {
                'formlyConfig': {
                  'defaultValue': []
                }
              },
              'items': {
                'type': 'object',
                'properties': {
                  'selection': {
                    'type': 'string',
                    'title': 'Select Field (must be multiple choice)',
                    'widget': {
                      'formlyConfig': {
                        'type': 'select',
                        'defaultValue': '',
                        'templateOptions': {
                          'options': []
                        },
                        'expressionProperties': {
                          'model.referenceId': 'model.selection ? model.selection.split(\'_\')[0] : null',
                          'model.value': 'model.selection ? model.selection.split(\'_\')[1] : null'
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          */
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
              'options': selectionOptionsMap[SelectionOptionType.FieldCategory].filter(x => x.value !== 'form')
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
            'defaultValue': '',
            'validators': {
              'validation': [
                'valid-name'
              ]
            }
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
      'typeField': {
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
              'model.type': 'field.templateOptions.options?.length === 1 ? field.templateOptions.options[0].value : (field.templateOptions.options?.find(x => x.value === model.type) ? model.type : undefined)',
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
          'listOfItems': {
            '$ref': '#/definitions/expression/listOfItems'
          },
          'differentFieldAnswer': {
            '$ref': '#/definitions/expression/differentFieldAnswer'
          },
          'condition': {
            '$ref': '#/definitions/expression/nestedCondition'
          }
        },
        'required': [
          'operator'
        ]
      },
      'hideRule': {
        'type': 'object',
        'widget': {
          'formlyConfig': {
            'defaultValue': {}
          }
        },
        'properties': {
          'source': {
            '$ref': '#/definitions/expression/hideSource'
          },
          'operator': {
            '$ref': '#/definitions/expression/operator'
          },
          'against': {
            '$ref': '#/definitions/expression/hideAgainst'
          }
        },
        'required': [
          'source'
        ]
      },
      'hideSource': {
        'type': 'object',
        'title': 'Compare Against',
        'widget': {
          'formlyConfig': {
            'defaultValue': {}
          }
        },
        'properties': {
          'selection': {
            '$ref': '#/definitions/expression/hideComparisonSource'
          },
          'field': {
            '$ref': '#/definitions/expression/hideFieldSelection'
          }
        },
        'required': [
          'selection'
        ]
      },
      'hideAgainst': {
        'type': 'object',
        'title': 'Compare Against',
        'widget': {
          'formlyConfig': {
            'defaultValue': {}
          }
        },
        'properties': {
          'selection': {
            '$ref': '#/definitions/expression/hideAgainstComparison'
          },
          'predefined': {
            '$ref': '#/definitions/expression/hideAgainstPredefined'
          },
          'options': {
            '$ref': '#/definitions/expression/hideAgainstSelections'
          }
        },
        'required': [
          'selection'
        ]
      },
      'hideComparisonSource': {
        'type': 'string',
        'title': 'Hide Source Selection',
        'widget': {
          'formlyConfig': {
            'type': 'select',
            'defaultValue': '',
            'templateOptions': {
              'options': selectionOptionsMap[SelectionOptionType.HideComparisonSource]
            }
          }
        }
      },
      'hideAgainstComparison': {
        'type': 'string',
        'title': 'Hide Against ',
        'widget': {
          'formlyConfig': {
            'type': 'select',
            'defaultValue': '',
            'templateOptions': {
              'options': selectionOptionsMap[SelectionOptionType.HideComparisonAgainst]
            }
          }
        }
      },
      'hideFieldSelection': {
        'type': 'string',
        'title': 'Select Field',
        'widget': {
          'formlyConfig': {
            'type': 'select',
            'defaultValue': '',
            'templateOptions': {
              'hideOptions': selectionOptionsMap[SelectionOptionType.HideComparisonSource].filter(x => Array.isArray(x.category) ? x.category.includes('field') : x.category === 'field')
            },
            'expressionProperties': {
              'templateOptions.required': '!!field?.templateOptions?.hideOptions.find(x => x.value === model.selection)'
            },
            'hideExpression': '!field?.templateOptions?.hideOptions.find(x => x.value === model.selection)'
          }
        }
      },
      'hideAgainstPredefined': {
        'type': 'string',
        'title': 'Predefined',
        'widget': {
          'formlyConfig': {
            'type': 'input',
            'defaultValue': '',
            'templateOptions': {
              'hideOptions': selectionOptionsMap[SelectionOptionType.HideComparisonAgainst].filter(x => Array.isArray(x.category) ? x.category.includes('predefined') : x.category === 'predefined')
            },
            'expressionProperties': {
              'templateOptions.required': '!!field?.templateOptions?.hideOptions.find(x => x.value === model.selection)'
            },
            'hideExpression': '!field?.templateOptions?.hideOptions.find(x => x.value === model.selection)'
          }
        }
      },
      'hideAgainstSelections': {
        'type': 'string',
        'title': 'List of Items',
        'widget': {
          'formlyConfig': {
            'type': 'select',
            'defaultValue': '',
            'templateOptions': {
              'options': selectionOptionsMap[SelectionOptionType.HideComparisonAgainst],
              'hideOptions': selectionOptionsMap[SelectionOptionType.HideComparisonAgainst].filter(x => Array.isArray(x.category) ? x.category.includes('options') : x.category === 'options')
            },
            'expressionProperties': {
              'templateOptions.required': '!!field?.templateOptions?.hideOptions.find(x => x.value === model.selection)'
            },
            'hideExpression': '!field?.templateOptions?.hideOptions.find(x => x.value === model.selection)'
          }
        }
      },
      'options': {
        'type': 'array',
        'title': 'List of Items',
        'widget': {
          'formlyConfig': {
            'type': 'expression-builder',
            'defaultValue': [],
            'hideExpression': 'model.against !== \'options\''
          }
        },
        'items': {
          '$ref': '#/definitions/expression/baseCondition'
        }
      },
      'operator': {
        'type': 'string',
        'title': 'Operator',
        'widget': {
          'formlyConfig': {
            'type': 'select',
            'defaultValue': '',
            'templateOptions': {
              'options': selectionOptionsMap[SelectionOptionType.ComparisonOperator]
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
              'options': selectionOptionsMap[SelectionOptionType.ComparisonType]
            }
          }
        }
      },
      'differentFieldAnswer': {
        'type': 'string',
        'title': 'Select Field',
        'widget': {
          'formlyConfig': {
            'type': 'select',
            'defaultValue': '',
            'templateOptions': {
              'options': []
            },
            'hideExpression': 'model.comparisonAgainst !== \'differentFieldAnswer\''
          }
        }
      },
      'predefined': {
        'type': 'string',
        'title': 'Predefined',
        'widget': {
          'formlyConfig': {
            'type': 'input',
            'defaultValue': '',
            'hideExpression': 'model.comparisonAgainst !== \'predefined\''
          }
        }
      },
      'listOfItems': {
        'type': 'array',
        'title': 'List of Items',
        'widget': {
          'formlyConfig': {
            'type': 'expression-builder',
            'defaultValue': [],
            'hideExpression': 'model.comparisonAgainst !== \'listOfItems\''
          }
        },
        'items': {
          '$ref': '#/definitions/expression/baseCondition'
        }
      }
    }
  }
})
