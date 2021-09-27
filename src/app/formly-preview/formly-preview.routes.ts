import { Routes, RouterModule } from '@angular/router';
import { FormlyPreviewComponent } from './formly-preview.component';

const routes: Routes = [
  { path: '', component: FormlyPreviewComponent, pathMatch: 'full' },
];

// Disable for naming convention check
// eslint-disable-next-line
export const FormlyPreviewRoutesModule = RouterModule.forChild(routes);
