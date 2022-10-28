import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormlyModule } from '@ngx-formly/core';
import { NgxEditorModule } from 'ngx-editor';

import { FormlyFormCoreModule } from 'src/app/formly-form-core/formly-form-core.module';

import { FormlyFormJsonSchemaInternalBuilderService } from './services/formly-form-json-schema-internal-builder.service';
import { FormlyBuilderRoutes } from './formly-form-json-schema-builder.routes';

import { validNameValidator } from './validators/valid-field-name.builder';

import { DisplayHtmlEditorComponent } from './components/display-html-editor/display-html-editor.component';
import { FieldEditorComponent } from './modals/field-editor/field-editor.component';
import { FormlyFormJsonSchemaBuilderComponent } from './formly-form-json-schema-builder.component';
import { FormEditorComponent } from './components/form-editor/form-editor.component';
import { OptionsEditorComponent } from './components/options-editor/options-editor.component';
import { PageFieldsComponent } from './components/page-fields/page-fields.component';
import { FormlyFormJsonSchemaBuilderService } from './services/formly-form-json-schema-builder.service';
import { DependencyBuilderComponent } from './components/dependency-builder/dependency-builder.component';
import { PreconfiguredSchemaComponent } from './wrappers/preconfigured-schema/preconfigured-schema.component';
import { PreconfiguredSchemaFieldsComponent } from './wrappers/preconfigured-schema-fields/preconfigured-schema-fields.component';

@NgModule({
  declarations: [
    DependencyBuilderComponent,
    DisplayHtmlEditorComponent,
    FieldEditorComponent,
    FormEditorComponent,
    FormlyFormJsonSchemaBuilderComponent,
    OptionsEditorComponent,
    PageFieldsComponent,
    PreconfiguredSchemaComponent,
    PreconfiguredSchemaFieldsComponent
  ],
  exports: [
    FormlyFormJsonSchemaBuilderComponent
  ],
  imports: [
    FormlyFormCoreModule,
    DragDropModule,
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatTooltipModule,
    NgxEditorModule,
    ScrollingModule,
    FormlyBuilderRoutes,
    FormlyModule.forChild({
      types: [
        { name: 'dependency-builder', component: DependencyBuilderComponent },
        { name: 'display-html-editor', component: DisplayHtmlEditorComponent },
        { name: 'form-editor', component: FormEditorComponent },
        { name: 'options-editor', component: OptionsEditorComponent },
        { name: 'page-fields', component: PageFieldsComponent }
      ],
      wrappers: [
        { name: 'preconfigured-schema-wrapper', component: PreconfiguredSchemaComponent },
        { name: 'preconfigured-schema-wrapper-fields', component: PreconfiguredSchemaFieldsComponent }
      ],
      validators: [
        { name: 'valid-name', validation: validNameValidator }
      ]
    })
  ],
  providers: [
    FormlyFormJsonSchemaInternalBuilderService
  ]
})
export class FormlyFormJsonSchemaBuilderModule { }
