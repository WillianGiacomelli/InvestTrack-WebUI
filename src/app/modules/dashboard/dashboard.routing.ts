import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent,
  },
];

export const DashboardRoutes = RouterModule.forChild(routes);
