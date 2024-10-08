import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { FormlyFormCoreModule } from 'src/app/formly-form-core/formly-form-core.module';
import { FormlyFormBuilderPreviewRoutesModule } from './formly-form-builder-preview.routes';

import { FormlyFormBuilderPreviewComponent } from './formly-form-builder-preview.component';

@NgModule({
  imports: [
    FormlyFormBuilderPreviewRoutesModule,
    FormlyFormCoreModule,
    MatDividerModule,
    MatProgressSpinnerModule
  ],
  declarations: [
    FormlyFormBuilderPreviewComponent
  ],
  exports: [
    FormlyFormBuilderPreviewComponent
  ],
  providers: []
})
export class FormlyFormBuilderPreviewModule { }
