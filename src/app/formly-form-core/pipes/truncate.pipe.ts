import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, limit = 25, completeWords = false, ellipsis = '...') {

    if (typeof value !== 'string') {
      return value;
    }

    if (value.length <= limit) {
      return value.substring(0, limit);
    }

    if (completeWords) {
      limit = value.substring(0, limit).lastIndexOf(' ');
    }

    return value.substring(0, limit).concat(ellipsis);
  }
}
