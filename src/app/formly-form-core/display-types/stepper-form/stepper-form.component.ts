import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy } from '@angular/core';
import { FormlyConfig, FormlyFieldConfig } from '@ngx-formly/core';
import { Subscription } from 'rxjs';

import { AbstractBaseFormControlsComponent } from '../base-form-controls';

@Component({
  selector: 'stepper-form',
  templateUrl: './stepper-form.component.html',
  styleUrls: ['./stepper-form.component.scss']
})
export class StepperFormComponent extends AbstractBaseFormControlsComponent implements OnDestroy {

  get pageStates(): { [key: string]: { icon: string, class: string }} {
    return this.props.pageStates;
  }

  public isMobile: boolean = false;

  private _subscriptions: Subscription[];

  constructor(private breakpointObserver: BreakpointObserver, formlyConfig: FormlyConfig) {
    super(formlyConfig);

    this._subscriptions = [];

    this._subscriptions.push(
      this.breakpointObserver.observe(Breakpoints.XSmall).subscribe(state => this.isMobile = state.matches)
    );
  }

  postPopulate(field: FormlyFieldConfig) {
    if (field.props) {
      if (field.props.linear === undefined || field.props.linear === null) {
        field.props['linear'] = true;
      }
    }
  }

  ngOnDestroy() {
    this._subscriptions.forEach(x => x.unsubscribe());

    super.ngOnDestroy();
  }
}
