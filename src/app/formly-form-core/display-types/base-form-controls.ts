import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormArray, UntypedFormGroup } from '@angular/forms';
import { FormlyConfig, FormlyFieldConfig, FieldTypeConfig } from '@ngx-formly/core';
import { FieldType } from '@ngx-formly/material';
import { Subscription } from 'rxjs';

@Component({ template: '' })
export abstract class AbstractBaseFormControlsComponent extends FieldType<FieldTypeConfig> implements OnInit, OnDestroy {
  public selectedIndex = -1;
  public currentPage?: FormlyFieldConfig;

  public subscriptions: Subscription[] = [];

  constructor(private formlyConfig: FormlyConfig) {
    super();
  }

  ngOnInit() {
    if (this.options && !this.options.formState.formHistory) {
      this.options.formState.formHistory = [];
    }

    this.incrementPageFromIndex(0);

    if (this.field.options?.fieldChanges) {
      this.subscriptions.push(
        this.field.options?.fieldChanges?.subscribe(change => {
          if (change.type === 'hidden' && change.value && change.field.parent === this.field) {
            const fieldIndex = this.field.fieldGroup?.findIndex(fg => fg === change.field);

            if (fieldIndex === this.selectedIndex) {
              if (this.hasBackPage(this.selectedIndex)) {
                this.decrementPageFromIndex(this.selectedIndex);
              } else {
                this.incrementPageFromIndex(this.selectedIndex);
              }
            }
          }
        })
      );
    }
  }

  ngOnDestory() {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

  isPrecedingPageInvalid(index: number, includeOptionalPageCheck = false, onlyTouchedPages: boolean = false): boolean {
    if (index < 1) {
      return this.isPageAtIndexInvalid(0, includeOptionalPageCheck);
    }

    return this.isPageAtIndexInvalid(index, includeOptionalPageCheck, onlyTouchedPages) || this.isPrecedingPageInvalid(index - 1, includeOptionalPageCheck, onlyTouchedPages);
  }

  isSubsequentPageInvalid(index: number, includeOptionalPageCheck = false, onlyTouchedPages: boolean = true): boolean {
    if (!this.field.fieldGroup || index >= this.field.fieldGroup?.length) {
      return this.isPageAtIndexInvalid(index, includeOptionalPageCheck, true);
    }

    return this.isPageAtIndexInvalid(index, includeOptionalPageCheck, onlyTouchedPages) || this.isSubsequentPageInvalid(index + 1, includeOptionalPageCheck, onlyTouchedPages);
  }

  isPageAtIndexInvalid(index: number, includeOptionalPageCheck: boolean = true, onlyTouchedPages: boolean = false): boolean {
    const page = this.field.fieldGroup && this.field.fieldGroup[index];

    let invalid = (page?.formControl?.invalid ?? false) && !page?.hide && (page?.props?.required ? true : includeOptionalPageCheck);

    if (onlyTouchedPages && !page?.formControl?.touched) {
      invalid = false;
    }

    return invalid;
  }

  hasBackPage(index: number) {
    const page = this.field?.fieldGroup?.slice(0, index)?.find(x => !x.hide);

    return page !== undefined;
  }

  hasForwardPage(index: number) {
    const page = this.field?.fieldGroup?.slice(index + 1)?.find(x => !x.hide);

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

    const nextPage = this.field.fieldGroup[index];

    if (nextPage) {
      const page = this.field.fieldGroup[this.selectedIndex];

      if (page && index > this.selectedIndex) {
        if (page.props?.required) {
          page.formControl?.markAsTouched();
          page.formControl?.updateValueAndValidity();
        } else {
          page.fieldGroup?.forEach(x => {
            if (!x.hide && x.props?.required) {
              x.formControl?.markAsTouched();
              x.formControl?.updateValueAndValidity();
            }
          });
        }
      }

      this.selectedIndex = index;
    }

    this.currentPage = nextPage;
  }

  visitedPageHasError(page: FormlyFieldConfig) {
    const pageControls = (page.formControl as UntypedFormGroup)?.controls ?? {};

    return this.options?.formState.formHistory?.find((x: any) => x.name === page.key)
      && Object.values(pageControls).filter(x => x.touched && x.invalid).length;
  }

  getPageState(page: FormlyFieldConfig) {
    const pageControls = (page.formControl as UntypedFormGroup)?.controls ?? {};

    if (Object.values(pageControls).filter(x => x.touched && x.invalid).length) {
      return 'page-error';
    }

    return page.props?.pageState;
  }

  getPageErrors(formControl?: AbstractControl, truncateLength?: number) {
    formControl?.updateValueAndValidity();

    const errors = this.getAllErrors(formControl);
    const errorString = errors.join('\n');

    return errorString && truncateLength ? errorString.substring(0, truncateLength).concat('...') : errorString;
  }

  getAllErrors(control?: AbstractControl) {
    if (!control || control?.valid) {
      return [];
    }

    const errors: string[] = [];

    if (control.errors) {
      errors.push(
        ...Object.keys(control.errors).map(key => {
          const validatorResponse = this.formlyConfig.getValidatorMessage(key);
          const field = (control as any)._fields?.[0];

          const value = (!validatorResponse || typeof validatorResponse === 'string') ? validatorResponse : field && validatorResponse(key, field);

          if (!value || typeof value === 'string') {
            return value;
          }

          return `${field?.props?.label} has error`;
        }).filter(x => x)
      );
    }

    if (Array.isArray((control as UntypedFormArray).controls)) {
      const childErrors = (control as UntypedFormArray).controls
        .filter(childControl => childControl?.invalid)
        .map(childControl => this.getAllErrors(childControl));

      errors.push(...childErrors.flat());
    } else if ((control as UntypedFormGroup).controls) {
      const childErrors = Object.values((control as UntypedFormGroup).controls)
        .filter(childControl => childControl?.invalid)
        .map(childControl => this.getAllErrors(childControl));

      errors.push(...childErrors.flat());
    }

    return errors;
  };
}
