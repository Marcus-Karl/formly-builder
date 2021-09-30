import { Component, OnDestroy, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/material';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

import { SelectOption } from '../../models/multiple-choice.models';

@Component({
  selector: 'radio-button-field',
  templateUrl: './radio-button-field.component.html',
  styleUrls: ['./radio-button-field.component.scss']
})
export class RadioButtonFieldComponent extends FieldType implements OnInit, OnDestroy {
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

  private _subscriptions: Array<Subscription> = [];

  ngOnInit() {
    super.ngOnInit();

    if (this.to.options instanceof Observable) {
      this._subscriptions.push(this.to.options.subscribe(this.selectOptions$));
    } else {
      let options = (this.to.options || []) as SelectOption[];
      this.selectOptions$.next(options);

      if (this.options?.fieldChanges) {
        this._subscriptions.push(this.options.fieldChanges.subscribe(field => {
          if (field['property'] === 'templateOptions.options' && Array.isArray(field.value)) {
            let mappedOptions = (this.to.options || []) as SelectOption[];
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
