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
import { TokenEditorComponent } from './components/tokens/token-editor/token-editor.component';
import { TokenPageComponent } from './components/tokens/token-page/token-page.component';
import { ExpressionBuilderComponent } from './components/expression/expression-builder/expression-builder.component';
import { OperatorConditionComponent } from './components/expression/operator-condition/operator-condition.component';
import { RuleEditorComponent } from './modals/rule-editor/rule-editor.component';
import { HideRuleEditorComponent } from './modals/hide-rule-editor/hide-rule-editor.component';
import { FormlyFormJsonSchemaBuilderService } from './services/formly-form-json-schema-builder.service';
import { DependencyBuilderComponent } from './components/dependency-builder/dependency-builder.component';

@NgModule({
  declarations: [
    DependencyBuilderComponent,
    DisplayHtmlEditorComponent,
    ExpressionBuilderComponent,
    FieldEditorComponent,
    FormEditorComponent,
    FormlyFormJsonSchemaBuilderComponent,
    HideRuleEditorComponent,
    OperatorConditionComponent,
    OptionsEditorComponent,
    PageFieldsComponent,
    RuleEditorComponent,
    TokenEditorComponent,
    TokenPageComponent,
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
        { name: 'expression-builder', component: ExpressionBuilderComponent },
        { name: 'form-editor', component: FormEditorComponent },
        { name: 'operator-condition', component: OperatorConditionComponent },
        { name: 'options-editor', component: OptionsEditorComponent },
        { name: 'page-fields', component: PageFieldsComponent },
        { name: 'token-editor', component: TokenEditorComponent },
        { name: 'token-page', component: TokenPageComponent },
      ],
      validators: [
        { name: 'valid-name', validation: validNameValidator }
      ]
    })
  ],
  providers: [
    FormlyFormJsonSchemaBuilderService,
    FormlyFormJsonSchemaInternalBuilderService
  ]
})
export class FormlyFormJsonSchemaBuilderModule { }
