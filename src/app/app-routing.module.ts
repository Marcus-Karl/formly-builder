import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'builder', pathMatch: 'full' },
  { path: 'builder', loadChildren: () => import('./formly-form-json-schema-builder/formly-form-json-schema-builder.module').then(m => m.FormlyBuilderModule) },
  { path: 'preview', loadChildren: () => import('./formly-form-builder-preview/formly-preview.module').then(m => m.FormlyPreviewModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
