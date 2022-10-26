import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FieldTypeConfig } from '@ngx-formly/core';
import { FieldType } from '@ngx-formly/material';
import { Subscription } from 'rxjs';

import { CustomDateAdapter, DateTimeService } from '../../services/date-time.service';

@Component({
  selector: 'date-input-field',
  templateUrl: './date-input-field.component.html',
  styleUrls: ['./date-input-field.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: CustomDateAdapter }
  ]
})
export class DateInputFieldComponent extends FieldType<FieldTypeConfig> implements OnDestroy, OnInit {
  @ViewChild('dateInput') public dateInput: ElementRef<HTMLInputElement> | undefined;

  @ViewChild('dayInput') public dayInput: ElementRef<HTMLInputElement> | undefined;
  @ViewChild('monthInput') public monthInput: ElementRef<HTMLInputElement> | undefined;
  @ViewChild('yearInput') public yearInput: ElementRef<HTMLInputElement> | undefined;

  public dateViewModel: Date | null | undefined;

  private _subscriptions: Subscription[] = [];

  constructor(private dateTimeService: DateTimeService) {
    super();
  }

  ngOnInit() {
    this._subscriptions.push(
      this.formControl.valueChanges.subscribe(value => {
        this.dateViewModel = this.dateTimeService.getDateFromISO(value);
      })
    );

    if (this.formControl.value) {
      this.dateViewModel = this.dateTimeService.getDateFromISO(this.formControl.value);
    }
  }

  ngOnDestroy() {
    this._subscriptions.forEach(x => x.unsubscribe());

    super.ngOnDestroy();
  }

  dateChange(dateChange: MatDatepickerInputEvent<Date>) {
    this.formControl.patchValue(dateChange.value?.toISOString().split('T')[0] ?? null);
  }
}
