import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { FieldArrayType, FormlyFieldConfig } from '@ngx-formly/core';

import { FormlyBuilderService } from 'src/app/formly-builder/formly-builder.service';
import { FunctionHelpers } from 'src/app/formly-builder/helpers/base.helper';

import { FieldEditorComponent } from 'src/app/formly-builder/modals/field-editor/field-editor.component';

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

  constructor(private dialog: MatDialog, private formlyBuilderService: FormlyBuilderService) {
    super();
  }

  ngOnInit() {
    if (!this._categories) {
      this._getCategories(this.field);
    }
  }

  drop(event: CdkDragDrop<PageFieldsComponent>) {
    if (!this.field.fieldGroup) {
      return;
    }

    if (event.previousContainer === event.container) {
      moveItemInArray(this.field.fieldGroup, event.previousIndex, event.currentIndex);

      this.field.fieldGroup.forEach((field: FormlyFieldConfig, index: number) => field.model['_order'] = index + 1);
    } else {
      try {
        let previousFieldGroup = event.previousContainer.data.field.fieldGroup || [];

        let modelToMove = previousFieldGroup[event.previousIndex].model;

        console.log(`currentIndex: ${event.currentIndex}`);
        console.log(`previousIndex: ${event.previousIndex}`);

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

    this.renderChanges();
  }

  add(i?: number, initialModel?: any, markAsDirty?: any) {
    if (this.options?.updateInitialValue) {
      this.options.updateInitialValue();
    }

    let index = (i === undefined || i === null) ? this.field.fieldGroup?.length || 0 : i;

    super.add(index, initialModel, markAsDirty);

    if (!this._categories) {
      this._getCategories(this.field);
    }

    if (this.field.fieldGroup && this.field.fieldGroup[index]) {
      let newField = this.field.fieldGroup[index];

      newField.model['_order'] = index + 1;
      newField.model['_referenceId'] = FunctionHelpers.generateId();

      this.edit(newField);
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
      FunctionHelpers.refreshPagesInformation(this.options?.formState);

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

  private _getCategories(field: FormlyFieldConfig) {
    if (field.fieldGroup?.length) {

      let categoryField = field.fieldGroup[0]?.fieldGroup?.find(x => x.key === 'category');

      if (categoryField?.templateOptions) {
        this._categories = categoryField.templateOptions.options as any;
      }
    }
  }
}
