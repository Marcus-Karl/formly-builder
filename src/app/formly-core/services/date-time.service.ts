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

  public parseUserPastedDateToISO(pastedData: string) {
    let dateParts = Intl.DateTimeFormat().formatToParts();

    let pastedParts = pastedData.split('/');

    if (pastedParts.length < 3) {
      pastedParts = pastedData.split('-');

      if (pastedParts.length < 3) {
        let delimeter = dateParts.find(x => x.type === 'literal')?.value;

        pastedParts = pastedData.split(delimeter || '/');

        if (pastedParts.length < 3) {
          console.error(`Unable to parse date: ${pastedData}`);
          return;
        }
      }
    }

    let day;
    let month;
    let year;
    let count = 0;

    for (let i = 0; i < dateParts.length && count < pastedParts.length; i++) {
      let type = dateParts[i].type;

      switch (type) {
        case 'year':
          year = this.padLeadingZero(pastedParts[count++], 4);
          break;
        case 'month':
          month = this.padLeadingZero(pastedParts[count++]);
          break;
        case 'day':
          day = this.padLeadingZero(pastedParts[count++]);
          break;
        case 'literal':
        default:
          continue;
      }
    }

    try {
      return new Date(`${year}-${month}-${day}`).toISOString();
    } catch (e) {
      console.error(`Error parsing date value: ${pastedData}`, e);
    }

    return null;
  }

  public formatDateToParts(isoDate: any): { [key: string]: string } {
    if (!isoDate) {
      console.error(`Invalid date passed`);
      return {};
    }

    let formattedParts: Intl.DateTimeFormatPart[] = [];

    try {
      formattedParts = Intl.DateTimeFormat('UTC').formatToParts(new Date(isoDate));
    } catch (e) {
      console.error(`Error parsing date value: ${isoDate}`, e);
    }

    return formattedParts.reduce((obj, x) => ({ ...obj, [x.type]: x.value }), {});
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

  public getDateFromParts(year: string | number, month: string | number, day: string | number) {
    let dateObj;

    try {
      dateObj = new Date(`${this.padLeadingZero(year, 4)}-${this.padLeadingZero(month)}-${this.padLeadingZero(day)}`);
    } catch (e) {
      console.error(`Error parsing date value. Year: ${year}, month: ${month}, day: ${day}`, e);
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
    return this.dateTimeService.getDateFromISO(value) ?? null;
  }
}
