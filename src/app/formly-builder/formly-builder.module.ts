import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormlyModule } from '@ngx-formly/core';
import { NgxEditorModule } from 'ngx-editor';

import { FormlyCoreModule } from 'src/app/formly-core/formly-core.module';

import { FormlyBuilderService } from './formly-builder.service';
import { FormlyBuilderRoutes } from './formly-builder.routes';

import { validNameValidator } from './helpers/validators/valid-field-name.helper';

import { AppGraphModule } from './components/app-graph/app-graph.module';
import { DisplayHtmlEditorComponent } from './components/fields/display-html-editor/display-html-editor.component';
import { FieldEditorComponent } from './modals/field-editor/field-editor.component';
import { FormlyBuilderComponent } from './formly-builder.component';
import { FormEditorComponent } from './components/form-editor/form-editor.component';
import { OptionsEditorComponent } from './components/fields/options-editor/options-editor.component';
import { PageFieldsComponent } from './components/fields/page-fields/page-fields.component';
import { TokenEditorComponent } from './components/tokens/token-editor/token-editor.component';
import { TokenPageComponent } from './components/tokens/token-page/token-page.component';
import { ExpressionBuilderComponent } from './components/expression/expression-builder/expression-builder.component';
import { OperatorStatementComponent } from './components/expression/operator-statement/operator-statement.component';
import { StatementEditorComponent } from './modals/statement-editor/statement-editor.component';

@NgModule({
  declarations: [
    DisplayHtmlEditorComponent,
    ExpressionBuilderComponent,
    FieldEditorComponent,
    FormEditorComponent,
    FormlyBuilderComponent,
    OperatorStatementComponent,
    OptionsEditorComponent,
    PageFieldsComponent,
    StatementEditorComponent,
    TokenEditorComponent,
    TokenPageComponent,
  ],
  exports: [
    FormlyBuilderComponent
  ],
  imports: [
    AppGraphModule,
    FormlyCoreModule,
    DragDropModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    MatTableModule,
    MatTooltipModule,
    NgxEditorModule,
    ScrollingModule,
    FormlyBuilderRoutes,
    FormlyModule.forChild({
      types: [
        { name: 'display-html-editor', component: DisplayHtmlEditorComponent },
        { name: 'expression-builder', component: ExpressionBuilderComponent },
        { name: 'form-editor', component: FormEditorComponent },
        { name: 'operator-statement', component: OperatorStatementComponent },
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
    FormlyBuilderService
  ]
})
export class FormlyBuilderModule { }
