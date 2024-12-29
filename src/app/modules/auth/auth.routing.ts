import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
];

export const AuthRoutes = RouterModule.forChild(routes);
