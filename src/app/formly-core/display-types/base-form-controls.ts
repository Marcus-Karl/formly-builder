import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FieldType } from '@ngx-formly/material';

@Component({ template: '' })
export abstract class AbstractBaseFormControlsComponent extends FieldType implements OnInit, AfterViewInit {
  public selectedIndex = -1;

  postPopulate(field: FormlyFieldConfig) {
    if (field.templateOptions) {
      if (field.templateOptions.linear === undefined || field.templateOptions.linear === null) {
        field.templateOptions['linear'] = true;
      }
    }
  }

  ngOnInit() {
    if (this.options && !this.options.formState.formHistory) {
      this.options.formState.formHistory = [];
    }

    super.ngOnInit();

    this.incrementPageFromIndex(0);
  }

  isPrecedingPageInvalid(index: number, includeOptionalPageCheck = false): boolean {
    if (index === 0) {
      return this.isPageAtIndexInvalid(index, includeOptionalPageCheck) ;
    }

    return this.isPageAtIndexInvalid(index, includeOptionalPageCheck) || this.isPrecedingPageInvalid(index - 1, includeOptionalPageCheck);
  }

  isSubsequentPageInvalid(index: number, includeOptionalPageCheck = false): boolean {
    if (!this.field.fieldGroup || index >= this.field.fieldGroup?.length) {
      return this.isPageAtIndexInvalid(index, includeOptionalPageCheck, true) ;
    }

    return this.isPageAtIndexInvalid(index, includeOptionalPageCheck, true) || this.isSubsequentPageInvalid(index + 1, includeOptionalPageCheck);
  }

  isPageAtIndexInvalid(index: number, includeOptionalPageCheck: boolean = true, onlyTouchedPages: boolean = false): boolean {
    let page = this.field.fieldGroup && this.field.fieldGroup[index];

    let invalid = (page?.formControl?.invalid || false) && !page.hide && (page.templateOptions?.isOptional ? includeOptionalPageCheck : true);

    if (onlyTouchedPages && !page?.formControl?.touched) {
      invalid = false;
    }

    return invalid;
  }

  hasBackPage(index: number) {
    let page = this.field?.fieldGroup?.slice(0, index)?.find(x => !x.hide);

    return page !== undefined;
  }

  hasForwardPage(index: number) {
    let page = this.field?.fieldGroup?.slice(index + 1)?.find(x => !x.hide);

    return page !== undefined;
  }

  decrementPageFromIndex(index: number) {
    for (let i = index; i >= 0; i--) {
      if (this.field.fieldGroup && !this.field.fieldGroup[i].hide) {
        this.changePage(i);

        break;
      }
    }
  }

  incrementPageFromIndex(index: number) {
    if (!this.field.fieldGroup) {
      return;
    }

    for (let i = index; i < this.field.fieldGroup.length; i++) {
      if (!this.field.fieldGroup[i].hide) {
        this.changePage(i);

        break;
      }
    }
  }

  changePage(index: number) {
    if (index === this.selectedIndex || !Array.isArray(this.field.fieldGroup)) {
      return;
    }

    let nextPage = this.field.fieldGroup[index];

    if (nextPage) {
      let currentPage = this.field.fieldGroup[this.selectedIndex];

      if (currentPage?.formControl && index > this.selectedIndex) {
        currentPage.fieldGroup?.forEach(x => {
          if (!x.hide && x.templateOptions?.required) {
            x.formControl?.markAsTouched();
          }
        })
      }

      this.selectedIndex = index;
    }
  }

  visitedPageHasError(page: FormlyFieldConfig) {
    let pageControls = (page.formControl as FormGroup)?.controls || {};

    return this.options?.formState.formHistory?.find((x: any) => x.name === page.key)
      && Object.values(pageControls).filter(x => x.touched && x.invalid).length;
  }

  getPageState(page: FormlyFieldConfig) {
    let pageControls = (page.formControl as FormGroup)?.controls || {};

    if (Object.values(pageControls).filter(x => x.touched && x.invalid).length) {
      return 'page-error';
    }

    return page.templateOptions?.pageState;
  }
}
