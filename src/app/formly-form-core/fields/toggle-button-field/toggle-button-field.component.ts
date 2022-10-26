import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FieldType } from '@ngx-formly/material';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { SelectOption } from '../../models/multiple-choice.models';

@Component({
  selector: 'app-toggle-button-field',
  templateUrl: './toggle-button-field.component.html',
  styleUrls: ['./toggle-button-field.component.scss']
})
export class ToggleButtonFieldComponent extends FieldType<FormlyFieldConfig> implements OnDestroy, OnInit {
  public selectOptions$ = new BehaviorSubject<SelectOption[]>([]);

  private _subscriptions: Array<Subscription> = [];

  ngOnInit() {
    if (this.props?.options instanceof Observable) {
      this._subscriptions.push(this.props.options.subscribe(this.selectOptions$));
    } else if (Array.isArray(this.props?.options)) {
      let options = this._mapOptions(this.props.options);
      this.selectOptions$.next(options);
    }
  }

  ngOnDestroy() {
    this._subscriptions.forEach(x => x.unsubscribe());
  }

  private _mapOptions(flatOptions: SelectOption[]) {
    let options: SelectOption[] = [];
    let groups: { [key: string]: SelectOption[] } = {};

    let groupProp = this.props?.groupProp || 'group';

    flatOptions?.forEach((option: SelectOption) => {
      if (!option[groupProp]) {
        options.push(option);
      } else if (groups[option[groupProp]]) {
        groups[option[groupProp]].push(option);
      } else {
        groups[option[groupProp]] = [option];

        options.push({
          label: option[groupProp],
          group: groups[option[groupProp]],
          _order: option._order
        });
      }
    });

    return options;
  }
}
