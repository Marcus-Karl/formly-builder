import { Routes, RouterModule } from '@angular/router';
import { FormlyFormJsonSchemaBuilderComponent } from './formly-form-json-schema-builder.component';

const routes: Routes = [
  { path: '', component: FormlyFormJsonSchemaBuilderComponent, pathMatch: 'full' },
];

// Disable for naming convention check
// eslint-disable-next-line
export const FormlyBuilderRoutes = RouterModule.forChild(routes);
