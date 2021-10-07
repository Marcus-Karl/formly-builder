import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { FieldArrayType, FormlyFieldConfig } from '@ngx-formly/core';
import { TranslateService } from '@ngx-translate/core';

import { FormlyBuilderService } from 'src/app/formly-builder/formly-builder.service';
import { ConfirmationModalComponent } from 'src/app/formly-core/modal/confirmation-modal/confirmation-modal.component';
import { ConfirmationModalData } from 'src/app/formly-core/models/confirmation-modal-data';
import { FunctionHelpers } from '../../helpers/base.helper';
import { PageFieldsComponent } from '../fields/page-fields/page-fields.component';

@Component({
  selector: 'form-editor',
  templateUrl: './form-editor.component.html',
  styleUrls: ['./form-editor.component.scss']
})
export class FormEditorComponent extends FieldArrayType implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion | undefined;
  @ViewChildren(PageFieldsComponent) pageFieldsComponents: QueryList<PageFieldsComponent> | undefined;

  public reorderEnabled = false;

  constructor(private dialog: MatDialog, private formlyBuilderService: FormlyBuilderService, private translateService: TranslateService) {
    super();
  }

  ngOnInit() {
    this.formlyBuilderService.registerMajorFormSections(this.field);

    if (this.field.fieldGroup?.length) {
      for (let page of this.field.fieldGroup) {
        this.formlyBuilderService.registerDropId(page);
      }
    }
  }

  reorderPage(event: CdkDragDrop<any[]>) {
    if (!this.field.fieldGroup) {
      return;
    }

    moveItemInArray(this.field.fieldGroup, event.previousIndex, event.currentIndex);

    this.field.fieldGroup.forEach((field: FormlyFieldConfig, index: number) => field.model['_order'] = index + 1);
  }

  add(i?: number, initialModel?: any, markAsDirty?: any) {
    let index = (i === undefined || i === null) ? this.field.fieldGroup?.length || 0 : i;

    super.add(index, initialModel, markAsDirty);

    if (this.field.fieldGroup && this.field.fieldGroup[index]) {
      let newPage = this.field.fieldGroup[index];

      newPage.model['_order'] = index + 1;
      newPage.model['_referenceId'] = FunctionHelpers.generateId();

      this.formlyBuilderService.registerDropId(newPage);
    }
  }

  confirmRemoval(formField: FormlyFieldConfig) {
    if (!Array.isArray(this.field.fieldGroup)) {
      return;
    }

    let index = this.field.fieldGroup.findIndex(x => x.id === formField?.id);

    if (index > -1) {
      let header = this.translateService.instant('Confirmation');
      let body = this.translateService.instant('Are you sure you want to remove this page?');
      let secondaryButtonText = this.translateService.instant('No');
      let removeText = this.translateService.instant('Yes');

      let data = new ConfirmationModalData(header, body, removeText, secondaryButtonText);

      this.dialog.open(ConfirmationModalComponent, {
        data: data,
        disableClose: data.disableClose,
        maxWidth: '100vw',
        maxHeight: '100vh'
      }).afterClosed().subscribe((action: string) => {
        if (action === removeText) {
          super.remove(index);

          this.field.fieldGroup
            ?.filter(field => field.model)
            .forEach((field: FormlyFieldConfig, index: number) => field.model['_order'] = index + 1);

          if (!this.field?.fieldGroup?.length) {
            this.reorderEnabled = false;
          }
        }
      });
    }
  }
}
