import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DateAdapter, ErrorStateMatcher } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FieldType } from '@ngx-formly/material';
import { TranslateService } from '@ngx-translate/core';
import { DateTime } from 'luxon';
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
export class DateInputFieldComponent extends FieldType implements OnDestroy, OnInit, AfterViewInit {
  @ViewChild('dateInput') public dateInput: ElementRef<HTMLInputElement> | undefined;

  public dateFormControl: FormControl = new FormControl();
  public dateViewModel: DateTime | undefined;
  public maxDate: string = DateTime.now().plus({ years: 200 }).toFormat('yyyy-LL-dd');

  private _dateFormat: string = 'yyyy-LL-dd';
  private _fromDateFormat: string = 'yyyy-LL-dd';
  private _locale: string = 'en-US';
  private _subscriptions: Subscription[] = [];

  constructor(private dateTimeService: DateTimeService, private translateService: TranslateService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();

    this._subscriptions.push(
      this.dateTimeService.dateFormat$.subscribe(dateFormat => this.setDateFormat(dateFormat)),
      this.dateTimeService.locale$.subscribe(locale => this._locale = locale)
    );

    if (this.formControl.value) {
      this.dateViewModel = DateTime.fromISO(this.formControl.value, { locale: this._locale });
    }
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();

    if (this.dateInput && this.dateViewModel?.isValid) {
      this.dateInput.nativeElement.value = this.dateViewModel.toFormat(this._dateFormat);
    }
  }

  ngOnDestroy() {
    this._subscriptions.forEach(x => x.unsubscribe());

    super.ngOnDestroy();
  }

  setDateFormat(dateFormat: string) {
    this.to['hint'] = dateFormat.replace(/L/g, 'm');
    this._dateFormat = dateFormat;
    this._fromDateFormat = dateFormat.replace(/dd/g, 'd').replace(/LL/g, 'L');
  }

  onPaste(event: ClipboardEvent) {
    this.formatDate(event.clipboardData?.getData('text') || '');
  }

  dateChange(dateChange: MatDatepickerInputEvent<DateTime>) {
    if (dateChange.value?.isValid && this.dateInput) {
      this.dateInput.nativeElement.value = dateChange.value.toFormat(this._dateFormat) || '';

      let endPosition = this.dateInput.nativeElement.value.length || 0;

      this.dateInput.nativeElement.focus();
      this.dateInput.nativeElement.setSelectionRange(endPosition, endPosition);
    }

    this.formatDate(dateChange.value, false);

    this.performValidation();
  }

  formatDate(date: any, updateDateViewModel: boolean = true) {
    let dateTime = date instanceof DateTime ? date : DateTime.fromFormat(date, this._fromDateFormat, { locale: this._locale });

    if (dateTime.isValid) {
      if (updateDateViewModel) {
        this.dateViewModel = dateTime;
      }

      this.formControl.patchValue(dateTime.toISO());
    } else {
      this.formControl.patchValue(null);
    }
  }

  performValidation() {
    this.formControl.updateValueAndValidity({ onlySelf: true });

    if (this.dateInput?.nativeElement.value && !DateTime.fromFormat(this.dateInput.nativeElement.value, this._fromDateFormat, { locale: this._locale }).isValid) {
      this.formControl.setErrors({ invalidDate: { message: 'Invalid date' } });
    }

    if (!this.formControl.touched) {
      this.formControl?.markAsTouched();
    }
  }
}
