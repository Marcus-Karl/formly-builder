import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FieldType } from '@ngx-formly/material';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { debounceTime, map, startWith, withLatestFrom } from 'rxjs/operators';

import { SelectOption } from '../../models/multiple-choice.models';

@Component({
  selector: 'select-autocomplete-field',
  templateUrl: './select-autocomplete-field.component.html',
  styleUrls: ['./select-autocomplete-field.component.scss']
})
export class SelectAutoCompleteFieldComponent extends FieldType implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatAutocompleteTrigger) autoCompleteTrigger: MatAutocompleteTrigger | undefined;
  public formControl!: FormControl;

  public get groupProp(): string {
    return this.to.groupProp || 'group';
  }

  public get labelProp(): string {
    return this.to.labelProp || 'label';
  }

  public get valueProp(): string {
    return this.to.valueProp || 'value';
  }

  public itemHeight = 48;
  public viewportHeight = 0;
  public filteredSelectOptions$: Observable<any[]> | undefined;
  public selectOptions$ = new BehaviorSubject<SelectOption[]>([]);

  private _options: any[] = [];
  private _subscriptions: Array<Subscription> = [];

  postPopulate(field: FormlyFieldConfig) {
    let to = field.templateOptions;

    if (to) {
      if (to.autoActiveFirstOption === undefined || to.autoActiveFirstOption === null) {
        to['autoActiveFirstOption'] = true;
      }

      if (to.disableRipple === undefined || to.disableRipple === null) {
        to['disableRipple'] = false;
      }
    }
  }

  ngOnInit() {
    super.ngOnInit();

    if (this.to.options instanceof Observable) {
      this._subscriptions.push(
        this.to.options.subscribe(options => {
          this._processOptionsChange(options);
        })
      );
    } else if (this.options?.fieldChanges) {
      this._subscriptions.push(
        this.options.fieldChanges.subscribe(field => {
          if (field['property'] === 'templateOptions.options' && Array.isArray(field.value)) {
            this._processOptionsChange(field.value);
          }
        })
      );
    }

    this.filteredSelectOptions$ = this.formControl.valueChanges.pipe(
      startWith(this.formControl.value || ''),
      debounceTime(100),
      withLatestFrom(this.selectOptions$),
      map(([userInput, options]: [string, SelectOption[]]) => {
        let filteredOptions = this._filter(options, userInput?.toLowerCase());

        this.viewportHeight = Math.min(256, this.itemHeight * filteredOptions.length);

        return filteredOptions;
      })
    );

    this.formControl.addValidators(this.selectionMatchesOption);

    this._processOptionsChange(this.to.options, true, true);
  }

  ngOnDestroy() {
    this._subscriptions.forEach(x => x.unsubscribe());

    this.field?.formControl?.removeValidators(this.selectionMatchesOption);

    super.ngOnDestroy();
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();

    this.autoCompleteTrigger?.setDisabledState(this.to.disabled || !this._options?.length);

    if (this.options?.fieldChanges) {
      this._subscriptions.push(
        this.options.fieldChanges.subscribe(field => {
          if (field['property'] === 'templateOptions.disabled') {
            this.autoCompleteTrigger?.setDisabledState(field.value || !this._options?.length);
          }
        })
      );
    }

    if (this.to.autoActiveFirstOption && this.autoCompleteTrigger?.panelClosingActions) {
      this._subscriptions.push(
        this.autoCompleteTrigger.panelClosingActions.subscribe(() => {
          let possibleOptionValue = this.autoCompleteTrigger?.activeOption?.value;

          if (this.formControl.value && possibleOptionValue && this.formControl.value !== possibleOptionValue && !this._options.find(x => x[this.valueProp] === this.formControl.value)) {
            let possibleMatches = this._filter(this._options, this.formControl.value.toLowerCase());

            if (possibleMatches?.length && possibleMatches.find(x => x[this.valueProp] === possibleOptionValue)) {
              this.formControl.patchValue(possibleOptionValue);
            } else {
              this.formControl.patchValue(null);
            }
          } else if (this._options.find(x => x[this.valueProp] === this.formControl.value)) {
            // Emit event on self for autocomplete update
            this.formControl.patchValue(this.formControl.value, { onlySelf: true });
          }
        })
      );
    }
  }

  selectionChange($event: MatAutocompleteSelectedEvent) {
    if (this.to.selectionChange) {
      this.to.selectionChange(this.field, $event);
    }
  }

  // This needs to be a variable/property and not a method for material autocomplete to use it correctly
  getDisplayLabel = (value: any): string => {
    if (!value) {
      return '';
    }

    let selectedOption = this.selectOptions$.value.find(x => x[this.valueProp] === value);

    if (selectedOption) {
      return selectedOption.label || value;
    }

    for (let groupOption of this.selectOptions$.value.filter(x => x.group && x.group.length > 0)) {
      selectedOption = groupOption.group?.find(x => x[this.valueProp] === value);

      if (selectedOption) {
        return selectedOption.label || value;
      }
    }

    return value;
  };

  private _filter(options: SelectOption[], filterValue: string) {
    if (!filterValue) {
      return options;
    }

    let filteredOptions: SelectOption[] = [];

    options?.forEach(option => {
      try {
        let optionGroupMatches = Array.isArray(option.group) ? this._filter(option.group, filterValue) : [];

        if (optionGroupMatches.length || option[this.labelProp]?.toLowerCase().includes(filterValue) || option[this.valueProp] === filterValue) {
          let optionCopy = Object.assign({}, option);

          if (optionGroupMatches.length) {
            optionCopy.group = optionGroupMatches;
          }

          filteredOptions.push(optionCopy);
        }
      } catch (e) {
        console.error(`Error parsing select dropdown options`, option, e);
      }
    });

    return filteredOptions;
  }

  private _processOptionsChange(options: any, emitEvent: boolean = true, onlySelf: boolean = false) {
    if (!Array.isArray(options)) {
      this._options = [];

      return;
    }

    this._options = options;
    let mappedOptions = this._mapOptions(options);
    this.selectOptions$.next(mappedOptions);

    if (this.formControl.value && !options.find(x => x[this.valueProp] === this.formControl.value)) {
      this.formControl.patchValue(null);
    } else {
      // Call to update filteredSelectOptions$ as needed
      this.formControl.patchValue(this.formControl.value, { onlySelf: onlySelf, emitEvent: emitEvent });
    }

    this.autoCompleteTrigger?.setDisabledState(this.to.disabled || !this._options?.length);
  }

  private _mapOptions(rawOptions: any) {
    let options: SelectOption[] = [];
    let groups: { [key: string]: SelectOption[]; } = {};

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
          _order: option._order
        });
      }
    });

    return options;
  }

  private selectionMatchesOption = (control: AbstractControl) => {
    if (!control.value?.length) {
      return null;
    }

    let matchingOption = this.selectOptions$.value?.find(x => x.value === control.value);

    if (!matchingOption) {
      let message = 'No option selected';
      return { [message]: { message: message } };
    }

    return null;
  }
}
