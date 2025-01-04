import { Not } from './../../../../node_modules/@inquirer/core/node_modules/@inquirer/type/dist/types/index.d';
import { Routes, RouterModule } from '@angular/router';
import { PublicComponent } from './component/public/public.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: PublicComponent },
];

export const PublicRoutes = RouterModule.forChild(routes);
