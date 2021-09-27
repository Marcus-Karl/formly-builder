import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  // from https://stackoverflow.com/questions/44669340/
  transform(value: string, limit = 25, completeWords = false, ellipsis = '...') {

    if (!value || !value.substr) {
      return value;
    }

    if (value.length <= limit) {
      return `${value.substr(0, limit)}`;
    }

    if (completeWords) {
      limit = value.substr(0, limit).lastIndexOf(' ');
    }

    return `${value.substr(0, limit)}${ellipsis}`;
  }
}
