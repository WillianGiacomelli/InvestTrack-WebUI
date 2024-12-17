import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', component: LoginComponent }
];

export const AuthRoutes = RouterModule.forChild(routes);
