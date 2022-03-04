import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SelectionChange, SelectionModel } from '@angular/cdk/collections';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatTable } from '@angular/material/table';
import { FieldArrayType, FormlyFieldConfig } from '@ngx-formly/core';
import { Subscription } from 'rxjs';
import { FunctionHelpers } from 'src/app/formly-form-json-schema-builder/builder-functions';

@Component({
  selector: 'options-editor',
  templateUrl: './options-editor.component.html',
  styleUrls: ['./options-editor.component.scss']
})
export class OptionsEditorComponent extends FieldArrayType implements OnInit, OnDestroy {
  @ViewChild('optionsTable') optionsTable: MatTable<any> | undefined;

  public disableReordering = true;
  public displayedColumns: Array<string> = ['value', 'label', 'edit'];

  public selection: SelectionModel<any> = new SelectionModel<any>(false, []);

  private _subscription: Array<Subscription>;

  constructor() {
    super();

    this._subscription = [];
  }

  getField(field: FormlyFieldConfig, key: string): FormlyFieldConfig {
    return field.fieldGroup?.find(x => x.key === key) || {};
  }

  ngOnInit() {
    if (!this.to.options) {
      this.to.options = [];
    }

    this._setupOptionEdit();
  }

  ngOnDestroy() {
    this._subscription?.forEach(x => x.unsubscribe());
  }

  drop(event: CdkDragDrop<any[]>) {
    if (!this.field.fieldGroup ) {
      return;
    }

    moveItemInArray(this.field.fieldGroup, event.previousIndex, event.currentIndex);

    this.field.fieldGroup.forEach((f: FormlyFieldConfig, index: number) => f.model['_order'] = index + 1);

    this.optionsTable?.renderRows();
  }

  add(i?: number, initialModel?: any, markAsDirty?: any) {
    let index = (i === undefined || i === null) ? this.field.fieldGroup?.length || 0 : i;

    super.add(index, initialModel || { value: '', label: '' }, markAsDirty);

    if (this.field.fieldGroup && this.field.fieldGroup[index]) {
      let newField = this.field.fieldGroup[index];

      newField.model['_order'] = index + 1;
      newField.model['_referenceId'] = FunctionHelpers.generateId();
    }

    this.optionsTable?.renderRows();
  }

  private _setupOptionEdit() {
    this._subscription.push(
      this.selection.changed.subscribe((row: SelectionChange<FormlyFieldConfig>) => {
        if (row.removed?.length) {
          let model = row.removed[0].model;

          if (!model?.value && !model?.value) {
            let existingIndex = this.field.fieldGroup?.findIndex(x => x === row.removed[0]) || -1;

            if (existingIndex > -1) {
              this.remove(existingIndex);
            }
          }
        }

        this.optionsTable?.renderRows();
      })
    );
  }
}
