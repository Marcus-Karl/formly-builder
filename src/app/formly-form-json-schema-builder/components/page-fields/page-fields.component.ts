import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { FieldArrayType, FormlyFieldConfig } from '@ngx-formly/core';

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

  constructor(private dialog: MatDialog, private formlyBuilderService: FormlyFormJsonSchemaInternalBuilderService) {
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
      const model = this.field.fieldGroup[event.previousIndex].model;

      super.remove(event.previousIndex);
      super.add(event.currentIndex, model);

      this.field.fieldGroup.forEach((field: FormlyFieldConfig, index: number) => field.model['_order'] = index + 1);
    } else {
      try {
        const previousFieldGroup = event.previousContainer.data.field.fieldGroup ?? [];

        const modelToMove = previousFieldGroup[event.previousIndex].model;
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

    this.options.updateInitialValue?.();

    this.formlyBuilderService.refreshPageStates();

    this.renderChanges();
  }

  add(i?: number, initialModel?: any, markAsDirty?: any) {
    this.options.updateInitialValue?.();
    const index = (i === undefined || i === null) ? this.field.fieldGroup?.length || 0 : i;

    super.add(index, initialModel, markAsDirty);

    if (this.field.fieldGroup && this.field.fieldGroup[index]) {
      const newField = this.field.fieldGroup[index];

      if (!newField.model['_order']) {
        newField.model['_order'] = index + 1;
      }

      if (!newField.model['_referenceId']) {
        newField.model['_referenceId'] = FunctionHelpers.generateId();
      }

      this.edit(newField, true, index);

      this.renderChanges();
    }

    this.formlyBuilderService.refreshPageStates();
  }

  confirmRemoval(formField: FormlyFieldConfig) {
    if (!Array.isArray(this.field.fieldGroup)) {
      return;
    }

    const index = this.field.fieldGroup.findIndex(x => x.id === formField?.id);

    if (index > -1) {
      const header = 'Confirmation';
      const body = 'Are you sure you want to remove this field?';
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

          this.field.fieldGroup
            ?.filter(field => field.model)
            .forEach((field: FormlyFieldConfig, index: number) => field.model['_order'] = index + 1);

          this.formlyBuilderService.refreshPageStates();

          this.renderChanges();
        }
      });
    }
  }

  edit(formField: FormlyFieldConfig, isNewlyAdded: boolean = false, index: number = -1) {
    this.options.updateInitialValue?.();

    this.dialog.open(FieldEditorComponent, {
      data: {
        field: formField,
        isNewlyAdded: isNewlyAdded,
        resetModel: () => isNewlyAdded && index !== -1 ? super.remove(index) : this.options?.resetModel?.()
      },
      disableClose: true,
      maxWidth: '100vw',
      maxHeight: '100vh',
      panelClass: 'resizable-overlay'
    }).afterClosed().subscribe(() => {
      this.formlyBuilderService.refreshPageStates();

      this.options.updateInitialValue?.();

      this.renderChanges();
    });
  }

  preview(formField: FormlyFieldConfig) {
    formField.formControl?.disable();
    this.options.updateInitialValue?.();

    this.dialog.open(FieldEditorComponent, {
      data: {
        field: formField,
        resetModel: () => this.options?.resetModel?.()
      },
      disableClose: true,
      maxWidth: '100vw',
      maxHeight: '100vh',
      panelClass: 'resizable-overlay'
    }).afterClosed().subscribe(() => {
      formField.formControl?.enable();
    });
  }

  renderChanges() {
    this.table?.renderRows();
  }

  getConnectedToDropIds(): string[] {
    return this.formlyBuilderService.getRegisteredDropIds(this.field.id as string);
  }

  private _setCategories() {
    const builderFormState: BuilderFormState = this.options?.formState;

    if (builderFormState?.builder.options[SelectionOptionType.FieldCategory]?.length) {
      this._categories = builderFormState?.builder.options[SelectionOptionType.FieldCategory];
    }
  }
}
