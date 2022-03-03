import { Pipe, PipeTransform } from '@angular/core';
import { FormlyTemplateOptions } from '@ngx-formly/core';

@Pipe({ name: 'tokens', pure: false })
export class FormlyTokenPipe implements PipeTransform {

  transform(value: any, to: FormlyTemplateOptions): string {
    if (!to._tokens || !value) {
      return value;
    }

    let tokenFunction = Function('token', `'use strict'; return \`${value}\`;`);

    return tokenFunction(to._tokens);
  }
}
