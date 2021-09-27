import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FieldType } from '@ngx-formly/material';

@Component({
  selector: 'default-form',
  templateUrl: './default-form.component.html',
  styleUrls: ['./default-form.component.scss']
})
export class DefaultFormComponent extends FieldType implements OnInit {

  public pageHistory: FormControl = new FormControl();

  ngOnInit() {
    if (this.options?.formState.formHistory?.length === 0 || !this.options?.formState.formHistory?.find((x: any) => x.name === this.options?.formState.currentPage)) {
      this.changePage(0);
    }

    super.ngOnInit();
  }

  postPopulate(field: FormlyFieldConfig) {
    if (field?.type === 'default-form' && field.templateOptions) {
      if (field.options && !field.options.formState.formHistory) {
        field.options.formState.formHistory = [];
      }
    }
  }

  changePage(index: number) {
    let nextPage = this.field.fieldGroup && this.field.fieldGroup[index];

    if (this.options && nextPage) {
      let pageKey = nextPage.key;

      let existingPage = this.options.formState.formHistory.find((x: any) => x.name === pageKey);

      if (!existingPage) {
        this.options.formState.formHistory.push({ name: nextPage.key, label: nextPage.templateOptions?.label });
      }

      this.options.formState.currentPage = pageKey;
    }
  }
}
