import { Routes, RouterModule } from '@angular/router';
import { ResetPasswordComponent } from './component/reset-password.component';

const routes: Routes = [
  { path: '', component: ResetPasswordComponent },
];

export const ResetPasswordRoutes = RouterModule.forChild(routes);
