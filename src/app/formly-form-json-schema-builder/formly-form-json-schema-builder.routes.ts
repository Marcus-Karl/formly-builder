import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormlyFormJsonSchemaBuilderComponent } from './formly-form-json-schema-builder.component';

const routes: Routes = [
  { path: '', component: FormlyFormJsonSchemaBuilderComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormlyFormJsonSchemaBuilderRoutingModule { }