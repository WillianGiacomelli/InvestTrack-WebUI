import { Routes, RouterModule } from '@angular/router';
import { PublicComponent } from './component/public/public.component';

const routes: Routes = [
  { path: '', component: PublicComponent },
];

export const PublicRoutes = RouterModule.forChild(routes);
