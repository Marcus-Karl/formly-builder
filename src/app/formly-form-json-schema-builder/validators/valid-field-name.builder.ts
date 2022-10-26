import { AbstractControl, ValidationErrors } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FieldValidatorFn } from '@ngx-formly/core/lib/models';

export const validNameValidator: FieldValidatorFn = (control: AbstractControl, field: FormlyFieldConfig): ValidationErrors | null => {
  let name = control.value;

  if (!name || /^[_a-zA-Z][\w_]*$/.test(name)) {
    return null;
  }

  if (name[0] && !/[_a-zA-Z]/.test(name[0])) {
    return { 'valid-name': { 'message': `Must start with a letter or underscore` } };
  }

  return { 'valid-name': { 'message': `Must contain only letters, numbers, or underscores` } };
}
