import { Pipe, PipeTransform } from '@angular/core';
import { SelectOption } from '../models/multiple-choice.models';

@Pipe({ name: 'sortOptions' })
export class SortOptionsPipe implements PipeTransform {

  transform(options: SelectOption[]): SelectOption[] {
    return options?.sort(this._sortOptions);
  }

  private _sortOptions(left: SelectOption, right: SelectOption) {
    return Number(left._order || 99999) - Number(right._order || 99999);
  }
}
