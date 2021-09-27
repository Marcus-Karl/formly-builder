import { Routes, RouterModule } from '@angular/router';
import { FormlyBuilderComponent } from './formly-builder.component';

const routes: Routes = [
  { path: '', component: FormlyBuilderComponent, pathMatch: 'full' },
];

// Disable for naming convention check
// eslint-disable-next-line
export const FormlyBuilderRoutes = RouterModule.forChild(routes);

