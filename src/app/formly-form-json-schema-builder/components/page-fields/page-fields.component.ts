import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { FieldArrayType, FormlyFieldConfig } from '@ngx-formly/core';
import { TranslateService } from '@ngx-translate/core';

import { FormlyFormJsonSchemaInternalBuilderService } from 'src/app/formly-form-json-schema-builder/services/formly-form-json-schema-internal-builder.service';
import { FunctionHelpers } from 'src/app/formly-form-json-schema-builder/builder';

import { FieldEditorComponent } from 'src/app/formly-form-json-schema-builder/modals/field-editor/field-editor.component';
import { ConfirmationModalComponent } from 'src/app/formly-form-core/modal/confirmation-modal/confirmation-modal.component';
import { ConfirmationModalData } from 'src/app/formly-form-core/models/confirmation-modal-data';
import { BuilderFormState, SelectionOptionType } from '../../models/builder-form-state';

@Component({
  selector: 'page-fields',
  templateUrl: './page-fields.component.html',
  styleUrls: ['./page-fields.component.scss']
})
export class PageFieldsComponent extends FieldArrayType implements OnInit {
  @ViewChild(MatTable) table: MatTable<any> | undefined;

  public columnsToDisplay = ['_order', 'category', 'basic.label', 'basic.type', 'edit'];
  public reorderEnabled = false;

  private _categories: any[] | undefined;

  constructor(private dialog: MatDialog, private formlyBuilderService: FormlyFormJsonSchemaInternalBuilderService, private translateService: TranslateService) {
    super();
  }

  ngOnInit() {
    this._setCategories();
  }

  drop(event: CdkDragDrop<PageFieldsComponent>) {
    if (!this.field.fieldGroup) {
      return;
    }

    if (event.previousContainer === event.container) {
      let model = this.field.fieldGroup[event.previousIndex].model;

      super.remove(event.previousIndex);
      super.add(event.currentIndex, model);

      this.field.fieldGroup.forEach((field: FormlyFieldConfig, index: number) => field.model['_order'] = index + 1);
    } else {
      try {
        let previousFieldGroup = event.previousContainer.data.field.fieldGroup ?? [];

        let modelToMove = previousFieldGroup[event.previousIndex].model;
        super.add(event.currentIndex, modelToMove, { markAsDirty: true });
        event.previousContainer.data.remove(event.previousIndex, { markAsDirty: true });

        previousFieldGroup
          .filter(field => field.model)
          .forEach((field: FormlyFieldConfig, index: number) => field.model['_order'] = index + 1);

        this.field.fieldGroup
          .filter(field => field.model)
          .forEach((field: FormlyFieldConfig, index: number) => field.model['_order'] = index + 1);

        event.previousContainer.data.renderChanges();
      } catch (e) {
        console.error(`Unable to transfer item between pages.`, e);
      }
    }

    if (this.options?.updateInitialValue) {
      this.options.updateInitialValue();
    }

    this.formlyBuilderService.refreshPageStates();

    this.renderChanges();
  }

  add(i?: number, initialModel?: any, markAsDirty?: any) {
    if (this.options?.updateInitialValue) {
      this.options.updateInitialValue();
    }

    let index = (i === undefined || i === null) ? this.field.fieldGroup?.length || 0 : i;

    super.add(index, initialModel, markAsDirty);

    if (this.field.fieldGroup && this.field.fieldGroup[index]) {
      let newField = this.field.fieldGroup[index];

      if (!newField.model['_order']) {
        newField.model['_order'] = index + 1;
      }

      if (!newField.model['_referenceId']) {
        newField.model['_referenceId'] = FunctionHelpers.generateId();
      }

      this.edit(newField);
    }

    this.formlyBuilderService.refreshPageStates();
  }

  confirmRemoval(formField: FormlyFieldConfig) {
    if (!Array.isArray(this.field.fieldGroup)) {
      return;
    }

    let index = this.field.fieldGroup.findIndex(x => x.id === formField?.id);

    if (index > -1) {
      let header = this.translateService.instant('Confirmation');
      let body = this.translateService.instant('Are you sure you want to remove this field?');
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

          this.formlyBuilderService.refreshPageStates();

          this.renderChanges();
        }
      });
    }
  }

  edit(formField: FormlyFieldConfig) {
    this.dialog.open(FieldEditorComponent, {
      data: formField,
      disableClose: true,
      maxWidth: '100vw',
      maxHeight: '100vh',
      panelClass: 'resizable-overlay'
    }).afterClosed().subscribe(() => {
      this.formlyBuilderService.refreshPageStates();

      this.table?.renderRows();
    });
  }

  preview(formField: FormlyFieldConfig) {
    if (formField.options?.updateInitialValue) {
      formField.options.updateInitialValue();
    }

    formField.formControl?.disable();

    this.dialog.open(FieldEditorComponent, {
      data: formField,
      disableClose: true,
      maxWidth: '100vw',
      maxHeight: '100vh',
      panelClass: 'resizable-overlay'
    }).afterClosed().subscribe(() => {
      if (formField.options?.resetModel) {
        formField.options.resetModel();
      }
    });
  }

  renderChanges() {
    this.table?.renderRows();
  }

  getConnectedToDropIds(): string[] {
    return this.formlyBuilderService.getRegisteredDropIds(this.field.id as string);
  }

  private _setCategories() {
    let builderFormState: BuilderFormState = this.options?.formState;

    if (builderFormState?.builder.options[SelectionOptionType.FieldCategory]?.length) {
      this._categories = builderFormState?.builder.options[SelectionOptionType.FieldCategory];
    }
  }
}
