import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { FieldType } from '@ngx-formly/material';
import { Editor, Toolbar } from 'ngx-editor';

@Component({
  selector: 'display-html-editor',
  templateUrl: './display-html-editor.component.html',
  styleUrls: ['./display-html-editor.component.scss']
})
export class DisplayHtmlEditorComponent extends FieldType implements OnInit, OnDestroy {

  public editor: Editor;
  public formControl!: UntypedFormControl;

  public toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ 'heading': ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify']
  ];

  constructor() {
    super();

    this.editor = new Editor();
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngOnDestroy() {
    super.ngOnDestroy();

    this.editor.destroy();
  }
}
