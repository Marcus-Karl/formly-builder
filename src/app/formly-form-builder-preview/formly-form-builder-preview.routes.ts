import { Routes, RouterModule } from '@angular/router';
import { FormlyFormBuilderPreviewComponent } from './formly-form-builder-preview.component';

const routes: Routes = [
  { path: '', component: FormlyFormBuilderPreviewComponent, pathMatch: 'full' },
];

// Disable for naming convention check
// eslint-disable-next-line
export const FormlyPreviewRoutesModule = RouterModule.forChild(routes);
