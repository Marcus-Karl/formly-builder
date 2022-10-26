import { Component } from '@angular/core';
import { FieldArrayTypeConfig, FieldTypeConfig } from '@ngx-formly/core';
import { FieldType } from '@ngx-formly/material/form-field';

@Component({
  selector: 'errors-and-hints',
  templateUrl: './errors-and-hints.component.html',
  styleUrls: ['./errors-and-hints.component.scss']
})
export class ErrorsAndHintsComponent extends FieldType<FieldTypeConfig | FieldArrayTypeConfig> {

  getErrorMessages(errorMessages: any) {
    if (errorMessages && !Array.isArray(errorMessages)) {
      return [errorMessages];
    }

    return errorMessages;
  }
}
