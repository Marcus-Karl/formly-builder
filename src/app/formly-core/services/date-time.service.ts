import { Platform } from '@angular/cdk/platform';
import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';
import { BehaviorSubject } from 'rxjs';

const DEFAULT_LOCALE = 'en-US';
const DEFAULT_DATE_TIME_FORMAT = 'mm-dd-yyyy hh:mm:ss';

@Injectable({ providedIn: 'root' })
export class DateTimeService {

  public dateTimeFormat$ = new BehaviorSubject<string>(DEFAULT_DATE_TIME_FORMAT);
  public dateFormat$ = new BehaviorSubject<string>(DEFAULT_DATE_TIME_FORMAT.split(' ')[0]);
  public locale$ = new BehaviorSubject<string>(DEFAULT_LOCALE);

  public getLocale(): string {
    const locale = this.locale$.value || DEFAULT_LOCALE;

    return locale.split('_').join('-');
  }

  public getDateToParts(isoDate: any): { [key: string]: string } {
    if (!isoDate) {
      console.error(`Invalid date passed`);
      return {};
    }

    let formattedParts: Intl.DateTimeFormatPart[] = [];

    try {
      formattedParts = Intl.DateTimeFormat(this.getLocale()).formatToParts(new Date(isoDate));
    } catch (e) {
      console.error(`Error parsing date value: ${isoDate}`, e);
    }

    return formattedParts.reduce((obj, x) => ({ ...obj, [x.type]: x.value }), {});
  }

  public getDateFromParts(year: string | number, month: string | number, day: string | number) {
    let dateObj;

    if (!year || !month || !day) {
      return;
    }

    try {
      dateObj = new Date(`${this.padLeadingZero(year, 4)}-${this.padLeadingZero(month)}-${this.padLeadingZero(day)}`);

      // Hack to adjust for offset and prevent date changing when converting from UTC to specific timezone in custom-date-input
      // Solution needs vetted more
      dateObj.setMinutes(dateObj.getMinutes() + dateObj.getTimezoneOffset());
    } catch (e) {
      console.error(`Error parsing date value. Year: ${year}, month: ${month}, day: ${day}`, e);
    }

    return dateObj;
  }

  public getDateFromISO(dateStr: string) {
    let dateObj;

    try {
      dateObj = new Date(dateStr);
    } catch (e) {
      console.error(`Error parsing date value: ${dateStr}`, e);
    }

    return dateObj;
  }

  public formatDateFromISO(dateStr: string, options?: Intl.DateTimeFormatOptions) {
    let dateObj = this.getDateFromISO(dateStr);

    return this.formatDate(dateObj, options);
  }

  public formatDate(dateObj?: Date, options: Intl.DateTimeFormatOptions = { dateStyle: 'short' }) {
    if (dateObj) {
      return Intl.DateTimeFormat(this.getLocale(), options).format(dateObj);
    }

    return '';
  }

  public formatDateAndTimeFromISO(dateStr: string, options: Intl.DateTimeFormatOptions = { dateStyle: 'short', timeStyle: 'medium' }) {
    let dateObj = this.getDateFromISO(dateStr);

    if (dateObj) {
      return Intl.DateTimeFormat(this.getLocale(), options).format(dateObj).replace(/, /g, ' ');
    }

    return '';
  }

  public parseUserPastedDateToISO(pastedData: string) {
    let dateParts = Intl.DateTimeFormat(this.getLocale()).formatToParts();

    let pastedParts = pastedData.split('/');

    if (pastedParts.length < 3) {
      pastedParts = pastedData.split('-');

      if (pastedParts.length < 3) {
        let delimeter = Intl.DateTimeFormat().formatToParts().find(x => x.type === 'literal')?.value;

        pastedParts = pastedData.split(delimeter || '/');

        if (pastedParts.length < 3) {
          console.error(`Unable to parse date: ${pastedData}`);
          return;
        }
      }
    }

    let day: string = '';
    let month: string = '';
    let year: string = '';
    let count = 0;

    for (let i = 0; i < dateParts.length && count < pastedParts.length; i++) {
      let type = dateParts[i].type;

      switch (type) {
        case 'year':
          year = pastedParts[count++];
          break;
        case 'month':
          month = pastedParts[count++];
          break;
        case 'day':
          day = pastedParts[count++];
          break;
        case 'literal':
        default:
          continue;
      }
    }

    try {
      return this.getDateFromParts(year, month, day);
    } catch (e) {
      console.error(`Error parsing date value: ${pastedData}`, e);
    }

    return null;
  }

  public padLeadingZero(value: string | number, length: number = 2) {
    return ('0'.repeat(length) + (value ?? '')).slice(-length);
  }
}

@Injectable()
export class CustomDateAdapter extends NativeDateAdapter {
  constructor(private dateTimeService: DateTimeService, public platform: Platform) {
    super(dateTimeService.getLocale(), platform);

    this.dateTimeService.locale$.subscribe(locale => this.setLocale(locale));
  }

  public format(date: Date, displayFormat: Object): string {
    return this.dateTimeService.formatDate(date, displayFormat);
  }

  public parse(value: any): Date | null {
    return (value && this.dateTimeService.getDateFromISO(value)) ?? null;
  }
}
