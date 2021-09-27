import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FieldType } from '@ngx-formly/material';
import { DateTime } from 'luxon';
import { Subscription } from 'rxjs';

import { CustomDateAdapter, DateTimeService } from '../../services/date-time.service';

@Component({
  selector: 'sectional-date-input-field',
  templateUrl: './sectional-date-input-field.component.html',
  styleUrls: ['./sectional-date-input-field.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: CustomDateAdapter }
  ]
})
export class SectionalDateInputFieldComponent extends FieldType implements OnDestroy, OnInit {
  @ViewChild('dateInput') public dateInput: ElementRef<HTMLInputElement> | undefined;

  @ViewChild('dayInput') public dayInput: ElementRef<HTMLInputElement> | undefined;
  @ViewChild('monthInput') public monthInput: ElementRef<HTMLInputElement> | undefined;
  @ViewChild('yearInput') public yearInput: ElementRef<HTMLInputElement> | undefined;

  public dateViewModel: DateTime | null | undefined;

  private _subscriptions: Subscription[] = [];

  constructor(private dateTimeService: DateTimeService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();

    this._subscriptions.push(
      this.formControl.valueChanges.subscribe(value => {
        this.dateViewModel = this.dateTimeService.getDateTimeFromISO(value);
      })
    );

    if (this.formControl.value) {
      this.dateViewModel = this.dateTimeService.getDateTimeFromISO(this.formControl.value);
    }
  }

  ngOnDestroy() {
    this._subscriptions.forEach(x => x.unsubscribe());

    super.ngOnDestroy();
  }

  dateChange(dateChange: MatDatepickerInputEvent<DateTime>) {
    if (dateChange.value?.isValid) {
      this.formControl.patchValue(dateChange.value.toISO());
    } else {
      this.formControl.patchValue(null);
    }
  }
}
