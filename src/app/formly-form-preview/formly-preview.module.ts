import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { FormlyCoreModule } from 'src/app/formly-form-core/formly-core.module';
import { FormlyPreviewRoutesModule } from './formly-preview.routes';

import { FormlyPreviewComponent } from './formly-preview.component';

@NgModule({
  imports: [
    FormlyPreviewRoutesModule,
    FormlyCoreModule,
    MatDividerModule,
    MatProgressSpinnerModule
  ],
  declarations: [
    FormlyPreviewComponent
  ],
  exports: [
    FormlyPreviewComponent
  ],
  providers: []
})
export class FormlyPreviewModule { }
