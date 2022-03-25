import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { FormArray } from '@angular/forms';
import { FieldArrayType, FormlyFieldConfig } from '@ngx-formly/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

import { ConfirmationModalData } from 'src/app/formly-form-core/models/confirmation-modal-data';
import { ConfirmationModalComponent } from 'src/app/formly-form-core/modal/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'expansion-panel-array-field',
  templateUrl: './expansion-panel-array-field.component.html',
  styleUrls: ['./expansion-panel-array-field.component.scss']
})
export class ExpansionPanelArrayFieldComponent extends FieldArrayType {
  public formControl!: FormArray;
  public isMobile: boolean = false;

  private _subscriptions: Subscription[] = [];

  constructor(private dialog: MatDialog, private breakpointObserver: BreakpointObserver, private translateService: TranslateService) {
    super();

    this._subscriptions.push(
      this.breakpointObserver.observe(Breakpoints.XSmall).subscribe(state => this.isMobile = state.matches)
    );
  }

  remove(rowId: number | string | FormlyFieldConfig) {
    let header = this.translateService.instant('Confirmation');
    let body = this.translateService.instant('Are you sure you want to remove this entry?');
    let primaryButtonText = this.translateService.instant('No');
    let removeText = this.translateService.instant('Yes, Remove');

    let data = new ConfirmationModalData(header, body, primaryButtonText, removeText);

    this.dialog.open(ConfirmationModalComponent, {
      data: data,
      disableClose: data.disableClose,
      maxWidth: '100vw',
      maxHeight: '100vh'
    }).afterClosed().subscribe((action: string) => {
      if (action === removeText) {
        if ((rowId as FormlyFieldConfig).id && this.field.fieldGroup) {
          rowId = this.field.fieldGroup.findIndex(x => x.id === (rowId as FormlyFieldConfig).id);
        }

        if (rowId > -1) {
          super.remove(Number(rowId));
        }
      }
    });
  }

  getValue(item: any, path: string) {
    if (item && path) {
      return path.split('.').reduce((nestedItem, key) => nestedItem && nestedItem[key] || '', item)
    }

    return '';
  }

  add(i?: number, initialModel?: any, markAsDirty?: any) {
    let index = (i === undefined || i === null) ? this.field.fieldGroup?.length || 0 : i;

    super.add(index, initialModel, markAsDirty);
  }

  getFields(field: FormlyFieldConfig) {
    return field.fieldGroup?.find(x => x.key === 'fields');
  }
}
