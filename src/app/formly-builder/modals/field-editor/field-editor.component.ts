import { AfterViewInit, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { SelectOption } from 'src/app/formly-core/models/multiple-choice.models';

@Component({
  selector: 'field-editor',
  templateUrl: './field-editor.component.html',
  styleUrls: ['./field-editor.component.scss']
})
export class FieldEditorComponent implements AfterViewInit {
  @ViewChild('emptyAnchor') emptyAnchor: ElementRef<HTMLDivElement> | undefined;
  public cdkContainer: HTMLElement | undefined;

  public selectOptions$ = new BehaviorSubject<SelectOption[]>([]);

  public categoryField: FormlyFieldConfig | undefined;
  public fieldToEdit: FormlyFieldConfig | undefined;
  public categoryLabel = '';
  public categorySelectionComplete: boolean;
  public savedDialogHeight: string;
  public savedDialogWidth: string;
  public isFullScreen: boolean;

  private _categories: any;
  private _subscriptions: Array<Subscription>;

  constructor(public dialogRef: MatDialogRef<FieldEditorComponent>, @Inject(MAT_DIALOG_DATA) public field: FormlyFieldConfig) {
    this.categorySelectionComplete = false;
    this.isFullScreen = false;
    this.savedDialogHeight = '';
    this.savedDialogWidth = '';
    this._subscriptions = [];

    this.categoryField = this.getFieldByCategory('category');

    this._categories = this.categoryField?.templateOptions?.options;

    if (this.categoryField?.formControl?.valid) {
      this.onSelectedCategory();
    } else if (this.categoryField?.templateOptions) {
      if (this.categoryField.templateOptions.options instanceof Observable) {
        this._subscriptions.push(this.categoryField.templateOptions.options.subscribe(this.selectOptions$));
      } else if (this.categoryField?.templateOptions?.options) {
        let options = this._mapOptions(this.categoryField.templateOptions.options);
        this.selectOptions$.next(options);
      }
    }
  }

  ngAfterViewInit() {
    if (this.emptyAnchor?.nativeElement?.parentElement?.parentElement) {
      this.cdkContainer = this.emptyAnchor.nativeElement.parentElement.parentElement;
    }
  }

  onSelectedCategory() {
    let category = this.categoryField?.formControl?.value;

    this.categoryLabel = this._categories?.find((x: any) => x.value === category)?.label;

    if (this.categoryLabel) {
      this.categorySelectionComplete = true;
    }
  }

  getFieldByCategory(category: string) {
    return this.field.fieldGroup?.find(x => x.key === category);
  }

  toggleSize() {
    if (!this.cdkContainer?.parentElement) {
      return;
    }

    if (this.isFullScreen) {
      this.cdkContainer.style.width = this.savedDialogWidth as string;
      this.cdkContainer.style.height = this.savedDialogHeight as string;
    } else {
      this.savedDialogWidth = this.cdkContainer.style.width;
      this.savedDialogHeight = this.cdkContainer.style.height;

      this.cdkContainer.style.width = '100vw';
      this.cdkContainer.style.height = '100vh';
    }

    let style = this.cdkContainer.parentElement.style as any;

    style.transform = null;

    this.isFullScreen = !this.isFullScreen;
  }

  resetAndClose() {
    if (this.field.options?.resetModel) {
      this.field.options.resetModel();
    }

    this.dialogRef.close();
  }

  updateAndClose() {
    if (this.field.options?.updateInitialValue) {
      this.field.options.updateInitialValue();
    }

    this.dialogRef.close();
  }

  private _mapOptions(flatOptions: SelectOption[]) {
    let options: SelectOption[] = [];
    let groups: { [key: string]: SelectOption[] } = {};

    let groupProp = this.categoryField?.templateOptions?.groupProp || 'group';

    flatOptions?.map((option: SelectOption) => {
      if (!option[groupProp]) {
        options.push(option);
      } else if (groups[option[groupProp]]) {
        groups[option[groupProp]].push(option);
      } else {
        groups[option[groupProp]] = [option];

        options.push({
          label: option[groupProp],
          group: groups[option[groupProp]],
          _order: option._order
        });
      }
    });

    return options;
  }
}
