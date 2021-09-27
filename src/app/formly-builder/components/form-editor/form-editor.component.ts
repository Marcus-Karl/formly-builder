import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { FieldArrayType, FormlyFieldConfig } from '@ngx-formly/core';

import { FormlyBuilderService } from 'src/app/formly-builder/formly-builder.service';
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

  constructor(private formlyBuilderService: FormlyBuilderService) {
    super();
  }

  ngOnInit() {
    if (this.field.fieldGroup) {
      for (let page of this.field.fieldGroup) {
        this.formlyBuilderService.registerDropId(page);
      }
    }
  }

  dropPage(event: CdkDragDrop<any[]>) {
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
}
