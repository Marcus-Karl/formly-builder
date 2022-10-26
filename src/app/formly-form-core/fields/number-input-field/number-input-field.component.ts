import { Component } from '@angular/core';
import { FieldTypeConfig } from '@ngx-formly/core';
import { FieldType } from '@ngx-formly/material';

@Component({
  selector: 'number-input-field',
  templateUrl: './number-input-field.component.html',
  styleUrls: ['./number-input-field.component.scss']
})
export class NumberInputFieldComponent extends FieldType<FieldTypeConfig> {
  public checkInput(event: KeyboardEvent) {
    const key = event?.key;

    if (['ArrowDown', 'ArrowUp'].includes(key)) {
      event.preventDefault();
    }
  }
}
