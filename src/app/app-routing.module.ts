import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'builder', pathMatch: 'full' },
  { path: 'builder', loadChildren: () => import('./formly-builder/formly-builder.module').then(m => m.FormlyBuilderModule) },
  { path: 'preview', loadChildren: () => import('./formly-preview/formly-preview.module').then(m => m.FormlyPreviewModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
