import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FieldType } from '@ngx-formly/material';

@Component({
  selector: 'number-input-field',
  templateUrl: './number-input-field.component.html',
  styleUrls: ['./number-input-field.component.scss']
})
export class NumberInputFieldComponent extends FieldType {
  public formControl!: FormControl;

  public checkInput(event: KeyboardEvent) {
    const key = event?.key;

    if (['ArrowDown', 'ArrowUp'].includes(key)) {
      event.preventDefault();
    }
  }
}
