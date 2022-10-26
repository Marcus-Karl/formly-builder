import { Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { FormlyFieldConfig, FieldTypeConfig } from '@ngx-formly/core';
import { FieldType } from '@ngx-formly/material';

@Component({
  selector: 'default-form',
  templateUrl: './default-form.component.html',
  styleUrls: ['./default-form.component.scss']
})
export class DefaultFormComponent extends FieldType<FieldTypeConfig> implements OnInit {

  public pageHistory: UntypedFormControl = new UntypedFormControl();

  ngOnInit() {
    if (this.options?.formState.formHistory?.length === 0 || !this.options?.formState.formHistory?.find((x: any) => x.name === this.options?.formState.currentPage)) {
      this.changePage(0);
    }
  }

  postPopulate(field: FormlyFieldConfig) {
    if (field?.type === 'default-form' && field.props) {
      if (field.options && !Array.isArray(field.options.formState.formHistory)) {
        field.options.formState.formHistory = [];
      }
    }
  }

  navigateToPage(event: MatSelectChange) {
    if (this.options?.formState.currentPage === event.value) {
      return;
    }

    let pageIndex = this.field.fieldGroup?.findIndex(x => x.key === event.value) ?? -1;

    if (pageIndex >= 0) {
      this.changePage(pageIndex);
    }
  }

  changePage(index: number) {
    let nextPage = this.field.fieldGroup && this.field.fieldGroup[index];

    if (this.options && nextPage) {
      let pageKey = nextPage.key;

      let existingPage = this.options.formState.formHistory.find((x: any) => x.name === pageKey);

      if (!existingPage) {
        this.options.formState.formHistory.push({ name: nextPage.key, label: nextPage.props?.label });
      }

      this.options.formState.currentPage = pageKey;

      this.pageHistory.patchValue(pageKey);
    }
  }
}
