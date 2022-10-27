import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { FieldTypeConfig } from '@ngx-formly/core';
import { FieldType } from '@ngx-formly/material';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { SelectOption } from '../../models/multiple-choice.models';

@Component({
  selector: 'app-toggle-button-field',
  templateUrl: './toggle-button-field.component.html',
  styleUrls: ['./toggle-button-field.component.scss']
})
export class ToggleButtonFieldComponent extends FieldType<FieldTypeConfig> implements OnDestroy, OnInit {
  @HostBinding('class') public hostCssClass: string = '';

  public selectOptions$ = new BehaviorSubject<SelectOption[]>([]);

  private _subscriptions: Array<Subscription> = [];

  ngOnInit() {
    if (this.props?.options instanceof Observable) {
      this._subscriptions.push(this.props.options.subscribe(this.selectOptions$));
    } else if (Array.isArray(this.props?.options)) {
      const options = this._mapOptions(this.props.options);
      this.selectOptions$.next(options);
    }

    this.hostCssClass = this.props.classes ?? '';
  }

  ngOnDestroy() {
    this._subscriptions.forEach(x => x.unsubscribe());
  }

  private _mapOptions(flatOptions: SelectOption[]) {
    const options: SelectOption[] = [];
    const groups: { [key: string]: SelectOption[] } = {};
    const groupProp = this.props?.groupProp || 'group';

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
