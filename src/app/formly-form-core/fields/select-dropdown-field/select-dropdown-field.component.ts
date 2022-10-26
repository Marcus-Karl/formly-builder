import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { FormlyFieldConfig, FieldTypeConfig } from '@ngx-formly/core';
import { FieldType } from '@ngx-formly/material';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

import { SelectOption } from '../../models/multiple-choice.models';

@Component({
  selector: 'select-dropdown-field',
  templateUrl: './select-dropdown-field.component.html',
  styleUrls: ['./select-dropdown-field.component.scss']
})
export class SelectDropDownFieldComponent extends FieldType<FieldTypeConfig> implements OnInit, OnDestroy {
  public get groupProp(): string {
    return this.props.groupProp || 'group';
  }

  public get labelProp(): string {
    return this.props.labelProp || 'label';
  }

  public get valueProp(): string {
    return this.props.valueProp || 'value';
  }

  public selectOptions$ = new BehaviorSubject<SelectOption[]>([]);

  private _subscriptions: Array<Subscription>;

  constructor() {
    super();

    this._subscriptions = [];
  }

  postPopulate(field: FormlyFieldConfig) {
    let props = field.props;

    if (props) {
      if (props.disableOptionCentering === undefined || props.disableOptionCentering === null) {
        props['disableOptionCentering'] = true;
      }

      if (!props.compareWith) {
        props['compareWith'] = (left: any, right: any) => left === right;
      }

      if (props.typeaheadDebounceInterval === undefined || props.typeaheadDebounceInterval === null) {
        props['typeaheadDebounceInterval'] = 100;
      }

      if (props.abbreviateSelection?.templateString && !props.abbreviateSelection?.templateStringFunction) {
        props.abbreviateSelection['templateStringFunction'] = Function('selectedOptions', 'totalOptions', `'use strict'; return \`${props.abbreviateSelection.templateString}\`;`);
      }
    }
  }

  ngOnInit() {
    if (this.props.options instanceof Observable) {
      this._subscriptions.push(this.props.options.subscribe(this.selectOptions$));
    } else {
      let options = this._mapOptions(this.props.options);
      this.selectOptions$.next(options);

      if (this.options?.fieldChanges) {
        this._subscriptions.push(this.options.fieldChanges.subscribe(field => {
          if (field['property'] === 'props.options' && Array.isArray(field.value)) {
            let mappedOptions = this._mapOptions(this.props.options);
            this.selectOptions$.next(mappedOptions);

            if (this.formControl.value && !mappedOptions.find(x => x.value === this.formControl.value)) {
              this.formControl.setValue(null);
            } else {
              // Trigger typing change
              this.formControl.setValue(this.formControl.value);
            }
          }
        }));
      }
    }
  }

  ngOnDestroy() {
    this._subscriptions.forEach(x => x.unsubscribe());

    super.ngOnDestroy();
  }

  selectionChange($event: MatSelectChange) {
    if (this.props.selectionChange) {
      this.props.selectionChange(this.field, $event);
    }
  }

  getAbbreviatedSelectionLabel() {
    if (!this.formControl.value || this.formControl.value?.length < 1) {
      return '';
    } else if (this.formControl.value?.length === 1) {
      return this.getDisplayLabel(this.formControl.value[0]);
    }

    let selectedOptions = this.getSelectedOptionsWithLabels();

    if (this.props.abbreviateSelection.templateStringFunction) {
      return this.props.abbreviateSelection.templateStringFunction(selectedOptions, this.selectOptions$.value.length);
    }

    let firstItem = this.getDisplayLabel(this.formControl.value[0]);
    let singleOtherSelection = this.props.abbreviateSelection.singleOtherSelectionLabel || 'other';
    let multipleOtherSelections = this.props.abbreviateSelection.multipleOtherSelectionLabels || 'others';

    return `${firstItem} (+ ${selectedOptions.length - 1} ${selectedOptions.length === 2 ? singleOtherSelection : multipleOtherSelections})`;
  }

  getSelectedOptionsWithLabels() {
    return (this.formControl.value as string[])?.map((x: string) => this.getDisplayLabel(x)) || [];
  }

  getSelectedOptionsTooltip() {
    return this.getSelectedOptionsWithLabels().join('\n');
  }

  getDisplayLabel(value: any): string {
    if (!value) {
      return '';
    }

    let selectedOption = this.selectOptions$.value.find(x => x.value === value);

    if (selectedOption) {
      return selectedOption.label|| value;
    }

    for (let groupOption of this.selectOptions$.value.filter(x => x.group && x.group.length > 0)) {
      selectedOption = groupOption.group?.find(x => x.value === value);

      if (selectedOption) {
        return selectedOption.label || value;
      }
    }

    return value;
  }

  private _mapOptions(rawOptions: any) {
    let options: SelectOption[] = [];
    let groups: { [key: string]: SelectOption[] } = {};

    rawOptions?.forEach((option: SelectOption) => {
      if (!option[this.groupProp]) {
        options.push(option);
      } else if (groups[option[this.groupProp]]) {
        groups[option[this.groupProp]].push(option);
      } else {
        groups[option[this.groupProp]] = [option];

        options.push({
          label: option[this.groupProp],
          group: groups[option[this.groupProp]],
          _order: option._order,
          classes: option.classes
        });
      }
    });

    return options;
  }
}
