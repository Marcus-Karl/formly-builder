import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FieldType } from '@ngx-formly/material';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { SelectOption } from '../../models/multiple-choice.models';

@Component({
  selector: 'select-dropdown-field',
  templateUrl: './select-dropdown-field.component.html',
  styleUrls: ['./select-dropdown-field.component.scss']
})
export class SelectDropDownFieldComponent extends FieldType implements OnInit, OnDestroy {
  public get groupProp(): string {
    return this.to.groupProp || 'group';
  }

  public get labelProp(): string {
    return this.to.labelProp || 'label';
  }

  public get valueProp(): string {
    return this.to.valueProp || 'value';
  }

  public selectOptions$ = new BehaviorSubject<SelectOption[]>([]);

  private _subscriptions: Array<Subscription>;

  constructor(private translateService: TranslateService) {
    super();

    this._subscriptions = [];
  }

  postPopulate(field: FormlyFieldConfig) {
    let to = field.templateOptions;

    if (to) {
      if (to.disableOptionCentering === undefined || to.disableOptionCentering === null) {
        to['disableOptionCentering'] = true;
      }

      if (!to.compareWith) {
        to['compareWith'] = (left: any, right: any) => left === right;
      }

      if (to.typeaheadDebounceInterval === undefined || to.typeaheadDebounceInterval === null) {
        to['typeaheadDebounceInterval'] = 100;
      }

      if (to.abbreviateSelection?.templateString && !to.abbreviateSelection?.templateStringFunction) {
        to.abbreviateSelection['templateStringFunction'] = Function('selectedOptions', 'totalOptions', `'use strict'; return \`${to.abbreviateSelection.templateString}\`;`);
      }
    }
  }

  ngOnInit() {
    super.ngOnInit();

    this._subscriptions.push(this.selectOptions$.pipe(tap(options => this._setDefaultOptionsTranslateText(options))).subscribe(() => {}));

    if (this.to.options instanceof Observable) {
      this._subscriptions.push(this.to.options.subscribe(this.selectOptions$));
    } else {
      let options = this._mapOptions(this.to.options);
      this.selectOptions$.next(options);

      if (this.options?.fieldChanges) {
        this._subscriptions.push(this.options.fieldChanges.subscribe(field => {
          if (field['property'] === 'templateOptions.options' && Array.isArray(field.value)) {
            let mappedOptions = this._mapOptions(this.to.options);
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
    if (this.to.selectionChange) {
      this.to.selectionChange(this.field, $event);
    }
  }

  getAbbreviatedSelectionLabel() {
    if (!this.formControl.value || this.formControl.value?.length < 1) {
      return '';
    } else if (this.formControl.value?.length === 1) {
      return this.getDisplayLabel(this.formControl.value[0]);
    }

    let selectedOptions = this.getSelectedOptionsWithLabels();

    if (this.to.abbreviateSelection.templateStringFunction) {
      return this.to.abbreviateSelection.templateStringFunction(selectedOptions, this.selectOptions$.value.length);
    }

    let firstItem = this.getDisplayLabel(this.formControl.value[0]);
    let singleOtherSelection = this.to.abbreviateSelection.singleOtherSelectionLabel || this.translateService.instant('other');
    let multipleOtherSelections = this.to.abbreviateSelection.multipleOtherSelectionLabels || this.translateService.instant('others');

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
      return this.translateService.instant(selectedOption.label)|| value;
    }

    for (let groupOption of this.selectOptions$.value.filter(x => x.group && x.group.length > 0)) {
      selectedOption = groupOption.group?.find(x => x.value === value);

      if (selectedOption) {
        return this.translateService.instant(selectedOption.label) || value;
      }
    }

    return value;
  }

  private _mapOptions(rawOptions: any) {
    let options: SelectOption[] = [];
    let groups: { [key: string]: SelectOption[] } = {};

    rawOptions?.map((option: SelectOption) => {
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

  private _setDefaultOptionsTranslateText(options: SelectOption[]) {
    if (this.translateService.defaultLang && this.translateService.translations && this.translateService.translations[this.translateService.defaultLang] && this.to._translationFormKey) {
      let defaultTranslations = this.translateService.translations[this.translateService.defaultLang];

      let translationsRef = this._getNestedObject(this.to._translationFormKey.split('.'), defaultTranslations);

      if (!translationsRef) {
        console.error(`Could not locate translation object reference for ${this.to._translationFormKey}`);

        return;
      }

      if (!translationsRef['options']) {
        translationsRef['options'] = {};
      }

      options?.forEach(option => {
        translationsRef['options'][option.value || option.label.replace(/^[0-9a-zA-Z]/g, '_')] = option.label;
      });

      this.translateService.setTranslation(this.translateService.defaultLang, defaultTranslations, true);
    }
  }

  private _getNestedObject(path: string[], sourceObj: any): any {
    if (!path?.length || !sourceObj) {
      return;
    }

    if (path.length > 1) {
      let key = path.shift() || '';

      return this._getNestedObject(path, sourceObj[key]);
    } else {
      return sourceObj[path[0]];
    }
  }
}
