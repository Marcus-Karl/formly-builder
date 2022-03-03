import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormInfo } from '../../models/form-info.models';

@Component({
  selector: 'inner-form-container',
  templateUrl: './inner-form-container.component.html',
  styleUrls: ['./inner-form-container.component.scss']
})
export class InnerFormContainerComponent implements OnInit {
  @Input() public field: FormlyFieldConfig = {};
  @Output() public dispose = new EventEmitter<any>();

  ngOnInit() {
    if (this.field.options?.formState && this.field.id) {
      if (!this.field.options.formState['_formNavigation']) {
        this.field.options.formState['_formNavigation'] = {};
      }

      this.field.options.formState._formNavigation[this.field.id] = { isInnerForm: true, close: this.close.bind(this), formInfo: new FormInfo() };
    }
  }

  close() {
    if (this.field.options?.formState?._formNavigation && this.field.id) {
      delete this.field.options.formState._formNavigation[this.field.id];
    }

    this.dispose.emit();
  }
}
