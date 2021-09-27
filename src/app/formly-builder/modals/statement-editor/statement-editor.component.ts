import { AfterViewInit, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'statement-editor',
  templateUrl: './statement-editor.component.html',
  styleUrls: ['./statement-editor.component.scss']
})
export class StatementEditorComponent implements AfterViewInit {
  @ViewChild('emptyAnchor') emptyAnchor: ElementRef<HTMLDivElement> | undefined;
  public cdkContainer: HTMLElement | undefined;

  public leftHandSide: FormlyFieldConfig | undefined;
  public operator: FormlyFieldConfig | undefined;
  public rightHandSide: FormlyFieldConfig | undefined;

  public isFullScreen: boolean;
  public label = '';

  private _savedDialogHeight = '';
  private _savedDialogWidth = '';

  constructor(public dialogRef: MatDialogRef<StatementEditorComponent>, @Inject(MAT_DIALOG_DATA) public field: FormlyFieldConfig) {
    this.isFullScreen = false;

    this._setStatementFields();
  }

  ngAfterViewInit() {
    if (this.emptyAnchor?.nativeElement?.parentElement?.parentElement) {
      this.cdkContainer = this.emptyAnchor.nativeElement.parentElement.parentElement;
    }
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

  toggleSize() {
    if (!this.cdkContainer?.parentElement) {
      return;
    }

    if (this.isFullScreen) {
      this.cdkContainer.style.width = this._savedDialogWidth;
      this.cdkContainer.style.height = this._savedDialogHeight;
    } else {
      this._savedDialogWidth = this.cdkContainer.style.width;
      this._savedDialogHeight = this.cdkContainer.style.height;

      this.cdkContainer.style.width = '100vw';
      this.cdkContainer.style.height = '100vh';
    }

    let style = this.cdkContainer.parentElement.style as any;
    style.transform = null;

    this.isFullScreen = !this.isFullScreen;
  }

  private _setStatementFields() {
    if (this.field.fieldGroup?.length) {
      this.leftHandSide = this.field.fieldGroup.find(x => x.key === 'leftHandSide');
      this.operator = this.field.fieldGroup.find(x => x.key === 'operator');
      this.rightHandSide = this.field.fieldGroup.find(x => x.key === 'rightHandSide');

      this.operator?.formControl?.valueChanges.subscribe(value => {
        this.label = (this.operator?.templateOptions?.options as any[])?.find(x => x.value === value)?.label;
      });
    }
  }
}
