import { Injectable } from '@angular/core';
import { LuxonDateAdapter } from '@angular/material-luxon-adapter';
import { DateTime } from 'luxon';
import { BehaviorSubject } from 'rxjs';

const DEFAULT_LOCALE = 'en-US';
const DEFAULT_DATE_TIME_FORMAT = 'LL-dd-yyyy hh:mm:ss';

@Injectable({ providedIn: 'root' })
export class DateTimeService {

  public dateTimeFormat$ = new BehaviorSubject<string>(DEFAULT_DATE_TIME_FORMAT);
  public dateFormat$ = new BehaviorSubject<string>(DEFAULT_DATE_TIME_FORMAT.split(' ')[0]);
  public locale$ = new BehaviorSubject<string>(DEFAULT_LOCALE);

  private _zoneName: string = Intl.DateTimeFormat().resolvedOptions().timeZone;

  public getLocale(): string {
    const locale = this.locale$.value || DEFAULT_LOCALE;

    return locale.split('_').join('-');
  }

  getDateTime(date: string, format: string = this.getDateFormat()) {
    let dateTime = DateTime.fromFormat(date, format, { zone: this._zoneName });

    return dateTime.isValid && dateTime || null;
  }

  getDateTimeFromISO(date: string) {
    let dateTime = DateTime.fromISO(date, { zone: 'UTC' });

    return dateTime.isValid && dateTime || null;
  }

  getDateTimeFromParts(year: string | number, month: string | number, day: string | number) {
    let dateTime = DateTime.local(Number(year), Number(month), Number(day), { zone: 'UTC' });

    return dateTime;
  }

  formatDateOnlyFromISO(date: string, format: string = this.getDateFormat()) {
    let dateTime = DateTime.fromISO(date, { zone: 'UTC' });

    if (format) {
      return dateTime.toFormat(format);
    }

    console.error('formatDateOnlyFromISO() does not have a format');

    return '';
  }

  formatDateTimeFromISO(date: string, format: string = this.getDateTimeFormat()) {
    let dateTime = DateTime.fromISO(date, { zone: 'UTC' });

    if (format) {
      return dateTime.toFormat(format);
    }

    console.error('formatDateTimeFromISO() does not have a format');

    return '';
  }

  formatDate(date: DateTime) {
    const format = this.getDateFormat();

    if (format) {
      return date.toFormat(format);
    }

    console.error('formatDateTime() does not have a format');

    return '';
  }

  formatDateFromParts(year: number, month: number, day: number) {
    const format = this.getDateFormat();

    if (format) {
      return DateTime.local(year, month, day, { zone: 'UTC' }).toFormat(format);
    }

    console.error('formatDateTime() does not have a format');

    return '';
  }

  formatDateTime(date: DateTime) {
    const format = this.getDateTimeFormat();

    if (format) {
      return date.toFormat(format);
    }

    console.error('formatDateTime() does not have a format');

    return '';
  }

  getDateFormat(): string {
    if (this.dateFormat$.value) {
      return this.dateFormat$.value;
    }

    console.error('getDateFormat() does not have a format');

    return '';
  }

  getDateTimeFormat(): string {
    if (this.dateTimeFormat$.value) {
      return this.dateTimeFormat$.value;
    }

    console.error('getDateTimeFormat() does not have a format');

    return '';
  }
}

// This custom date adapter allows us to provide a dynamic date format
@Injectable()
export class CustomDateAdapter extends LuxonDateAdapter {
  private dateFormat = '';

  constructor(private _dateTimeService: DateTimeService) {
    super('en-US', { useUtc: true });

    this._dateTimeService.locale$.subscribe(locale => this.setLocale(locale));
    this._dateTimeService.dateFormat$.subscribe(format => this.dateFormat = format);
  }

  public format(date: DateTime, displayFormat: string): string {
    if (!date.isValid) {
      throw Error('Invalid date');
    }

    return date.toFormat(this.dateFormat);
  }

  public parse(value: any, parseFormat: string | string[]): DateTime | null {
    return super.parse(value, this.dateFormat);
  }
}
