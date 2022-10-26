import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FieldType } from '@ngx-formly/material';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

import { SelectOption } from '../../models/multiple-choice.models';

@Component({
  selector: 'radio-button-field',
  templateUrl: './radio-button-field.component.html',
  styleUrls: ['./radio-button-field.component.scss']
})
export class RadioButtonFieldComponent extends FieldType<FormlyFieldConfig> implements OnInit, OnDestroy {
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

  private _subscriptions: Array<Subscription> = [];

  ngOnInit() {
    if (this.props.options instanceof Observable) {
      this._subscriptions.push(this.props.options.subscribe(this.selectOptions$));
    } else {
      let options = (this.props.options || []) as SelectOption[];
      this.selectOptions$.next(options);

      if (this.options?.fieldChanges) {
        this._subscriptions.push(this.options.fieldChanges.subscribe(field => {
          if (field['property'] === 'props.options' && Array.isArray(field.value)) {
            let mappedOptions = (this.props.options || []) as SelectOption[];
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
}
