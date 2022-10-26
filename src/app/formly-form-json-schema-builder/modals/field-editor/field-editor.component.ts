import { AfterViewInit, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { BuilderFormState, SelectionOptionType } from '../../models/builder-form-state';

@Component({
  selector: 'field-editor',
  templateUrl: './field-editor.component.html',
  styleUrls: ['./field-editor.component.scss']
})
export class FieldEditorComponent implements AfterViewInit {
  @ViewChild('emptyAnchor') emptyAnchor: ElementRef<HTMLDivElement> | undefined;
  public cdkContainer: HTMLElement | undefined;

  public categoryField: FormlyFieldConfig | undefined;
  public fieldToEdit: FormlyFieldConfig | undefined;
  public categoryLabel = '';
  public categorySelectionComplete: boolean;
  public savedDialogHeight: string;
  public savedDialogWidth: string;
  public isFullScreen: boolean;

  constructor(public dialogRef: MatDialogRef<FieldEditorComponent>, @Inject(MAT_DIALOG_DATA) public field: FormlyFieldConfig) {
    this.categorySelectionComplete = false;
    this.isFullScreen = false;
    this.savedDialogHeight = '';
    this.savedDialogWidth = '';

    this.categoryField = this.getFieldByKey('category');

    if (this.categoryField?.formControl?.valid) {
      this.onSelectedCategory();
    }
  }

  ngAfterViewInit() {
    if (this.emptyAnchor?.nativeElement?.parentElement?.parentElement) {
      this.cdkContainer = this.emptyAnchor.nativeElement.parentElement.parentElement;
    }
  }

  onSelectedCategory() {
    const category = this.categoryField?.formControl?.value;
    const builderFormState: BuilderFormState = this.field.options?.formState;

    if (builderFormState?.builder.options[SelectionOptionType.FieldCategory]) {
      this.categoryLabel = builderFormState?.builder.options[SelectionOptionType.FieldCategory].find((x: any) => x.value === category)?.label ?? '';
    }

    if (this.categoryLabel && this.categoryField) {
      if (!this.categoryField.templateOptions) {
        this.categoryField.templateOptions = {}
      }

      this.categorySelectionComplete = true;
      this.categoryField.templateOptions._selectionComplete = true;
    }
  }

  getFieldByKey(category: string) {
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

    const style = this.cdkContainer.parentElement.style as any;
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
}
