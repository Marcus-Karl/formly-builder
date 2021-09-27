import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Subscription } from 'rxjs';

import { AbstractBaseFormControlsComponent } from '../base-form-controls';

@Component({
  selector: 'stepper-form',
  templateUrl: './stepper-form.component.html',
  styleUrls: ['./stepper-form.component.scss']
})
export class StepperFormComponent extends AbstractBaseFormControlsComponent implements OnDestroy {
  public isMobile: boolean = false;

  private _subscriptions: Subscription[];

  constructor(private breakpointObserver: BreakpointObserver) {
    super();

    this._subscriptions = [];

    this._subscriptions.push(
      this.breakpointObserver.observe(Breakpoints.XSmall).subscribe(state => this.isMobile = state.matches)
    );
  }

  ngOnDestroy() {
    this._subscriptions.forEach(x => x.unsubscribe());

    super.ngOnDestroy();
  }

  getPageState(page: FormlyFieldConfig) {
    return super.getPageState(page);
  }

  getPageFormControl(page: FormlyFieldConfig) {
    return page.formControl as AbstractControl;
  }

  getPageStates() {
    return this.to.pageStates as { [key: string]: { class: string, icon: string } };
  }
}
