import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { FieldArrayType, FormlyFieldConfig } from '@ngx-formly/core';

import { ConfirmationModalComponent } from 'src/app/formly-form-core/modal/confirmation-modal/confirmation-modal.component';
import { ConfirmationModalData } from 'src/app/formly-form-core/models/confirmation-modal-data';
import { FormlyFormJsonSchemaInternalBuilderService } from 'src/app/formly-form-json-schema-builder/services/formly-form-json-schema-internal-builder.service';
import { FunctionHelpers } from '../../builder';
import { PageFieldsComponent } from '../page-fields/page-fields.component';

@Component({
  selector: 'form-editor',
  templateUrl: './form-editor.component.html',
  styleUrls: ['./form-editor.component.scss']
})
export class FormEditorComponent extends FieldArrayType implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion | undefined;
  @ViewChildren(PageFieldsComponent) pageFieldsComponents: QueryList<PageFieldsComponent> | undefined;

  public reorderEnabled = false;
  public addedIndex?: number;

  constructor(private dialog: MatDialog, private formlyBuilderService: FormlyFormJsonSchemaInternalBuilderService) {
    super();
  }

  ngOnInit() {
    this.formlyBuilderService.registerMajorFormSections(this.field);

    if (this.field.fieldGroup?.length) {
      for (let page of this.field.fieldGroup) {
        this.formlyBuilderService.registerPageDropIds(page);
      }
    }
  }

  reorderPage(event: CdkDragDrop<any[]>) {
    if (!this.field.fieldGroup?.length) {
      return;
    }

    const model = this.field.fieldGroup[event.previousIndex].model;

    super.remove(event.previousIndex);
    super.add(event.currentIndex > event.previousIndex ? --event.currentIndex : event.currentIndex, model);

    this.addedIndex = undefined;

    this._setFieldGroupOrder();
  }

  add(i?: number, initialModel?: any, markAsDirty?: any) {
    const index = (i === undefined || i === null) ? this.field.fieldGroup?.length || 0 : i;

    super.add(index, initialModel, markAsDirty);

    if (this.field.fieldGroup && this.field.fieldGroup[index]) {
      const newPage = this.field.fieldGroup[index];

      if (!newPage.model['_order']) {
        newPage.model['_order'] = index + 1;
      }

      if (!newPage.model['_referenceId']) {
        newPage.model['_referenceId'] = FunctionHelpers.generateId();
      }

      this.formlyBuilderService.registerPageDropIds(newPage);
    }

    this.addedIndex = index;

    this.formlyBuilderService.refreshPageStates();
  }

  confirmRemoval(page: FormlyFieldConfig) {
    this.addedIndex = undefined;

    if (!Array.isArray(this.field.fieldGroup)) {
      return;
    }

    const index = this.field.fieldGroup.findIndex(x => x.id === page?.id);

    if (index > -1) {
      const header = 'Confirmation';
      const body = 'Are you sure you want to remove this page?';
      const secondaryButtonText = 'No';
      const removeText = 'Yes';

      const data = new ConfirmationModalData(header, body, removeText, secondaryButtonText);

      this.dialog.open(ConfirmationModalComponent, {
        data: data,
        disableClose: data.disableClose,
        maxWidth: '100vw',
        maxHeight: '100vh'
      }).afterClosed().subscribe((action: string) => {
        if (action === removeText) {
          super.remove(index);

          this.formlyBuilderService.removePageDropId(page);

          this._setFieldGroupOrder();

          if (!this.field?.fieldGroup?.length) {
            this.reorderEnabled = false;
          }

          this.formlyBuilderService.refreshPageStates();
        }
      });
    }
  }

  private _setFieldGroupOrder() {
    this.field.fieldGroup?.forEach((field: FormlyFieldConfig, index: number) => field.model['_order'] = index + 1);
  }
}
