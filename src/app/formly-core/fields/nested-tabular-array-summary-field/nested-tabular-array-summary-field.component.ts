import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { FieldArrayType, FormlyFieldConfig } from '@ngx-formly/core';
import { TranslateService } from '@ngx-translate/core';

import { ConfirmationModalData } from 'src/app/formly-core/models/confirmation-modal-data';
import { ConfirmationModalComponent } from 'src/app/formly-core/modal/confirmation-modal/confirmation-modal.component';
import { FormInfo } from '../../models/form-info.models';

@Component({
  selector: 'nested-tabular-array-summary-field',
  templateUrl: './nested-tabular-array-summary-field.component.html',
  styleUrls: ['./nested-tabular-array-summary-field.component.scss']
})
export class NestedTabularArraySummaryFieldComponent extends FieldArrayType implements OnInit {
  @ViewChild(MatTable) table: MatTable<any> | undefined;

  public datasource: MatTableDataSource<any>;
  public displayedColumns: Array<string>;
  public fieldToEdit?: FormlyFieldConfig;

  constructor(private dialog: MatDialog,  private translateService: TranslateService) {
    super();

    this.datasource = new MatTableDataSource<any>([]);
    this.displayedColumns = [];
  }

  ngOnInit() {
    this.datasource.data = this.field.fieldGroup || [];

    if (this.to?.columns && !this.to?.columns?.find((x: any) => x.path === 'STATUS')) {
      this.to?.columns.push({ 
        '_order': this.to.columns.length,
        'label': 'Status',
        'path': 'STATUS',
        'type': 'icons',
        'classes': ''
      });
    }

    if (this.to?.columns && !this.to?.columns?.find((x: any) => x.path === 'ACTIONS')) {
      this.to?.columns.push({ 
        '_order': this.to.columns.length,
        'label': '',
        'path': 'ACTIONS',
        'type': 'buttons',
        'classes': ''
      });
    }

    this.displayedColumns = this.to?.columns?.filter((x: any) => x.path).map((x: any) => x.path) || [];
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

        this.table?.renderRows();
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

    if (this.field.fieldGroup && this.field.fieldGroup[index]) {
      this.edit(this.field.fieldGroup[index]);
    }
  }

  edit(formField: FormlyFieldConfig) {
    this.fieldToEdit = formField?.fieldGroup?.find(x => x.key === 'fields');

    if (this.fieldToEdit) {
      if (!this.fieldToEdit.templateOptions) {
        this.fieldToEdit.templateOptions = {};
      }

      this.fieldToEdit.templateOptions['_isInnerForm'] = true;
      this.fieldToEdit.templateOptions['_closeFunction'] = () => this.fieldToEdit = undefined;
      this.fieldToEdit.templateOptions['_formInfo'] = this.getParentFormInfo(this.field.parent);
    }
  }

  private getParentFormInfo(field?: FormlyFieldConfig): FormInfo | undefined {
    if (field?.templateOptions?._formInfo instanceof FormInfo) {
      return field.templateOptions?._formInfo;
    }

    return field && this.getParentFormInfo(field?.parent);
  }
}
