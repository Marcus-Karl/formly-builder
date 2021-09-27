import { Component, Inject  } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ConfirmationModalData } from 'src/app/formly-core/models/confirmation-modal-data';

@Component({
  selector: 'confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public modalData: ConfirmationModalData) {
  }
}
