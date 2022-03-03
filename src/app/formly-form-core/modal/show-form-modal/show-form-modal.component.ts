import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'show-form-modal',
  templateUrl: './show-form-modal.component.html',
  styleUrls: ['./show-form-modal.component.scss']
})
export class ShowFormModalComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public field: FormlyFieldConfig, private dialogRef: MatDialogRef<ShowFormModalComponent>) {
    if (field.options?.formState && field.id) {
      if (!field.options.formState['_formNavigation']) {
        field.options.formState['_formNavigation'] = {};
      }

      field.options.formState._formNavigation[field.id] = { isInnerForm: true, close: this.close.bind(this) };
    }
  }

  close() {
    if (this.field.options?.formState?._formNavigation && this.field.id) {
      delete this.field.options.formState._formNavigation[this.field.id];
    }

    this.dialogRef.close();
  }
}
