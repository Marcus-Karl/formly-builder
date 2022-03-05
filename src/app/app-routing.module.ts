import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'builder', pathMatch: 'full' },
  { path: 'builder', loadChildren: () => import('./formly-form-json-schema-builder/formly-form-json-schema-builder.module').then(m => m.FormlyFormJsonSchemaBuilderModule) },
  { path: 'preview', loadChildren: () => import('./formly-form-builder-preview/formly-form-builder-preview.module').then(m => m.FormlyFormBuilderPreviewModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
