import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { NotFoundComponent } from './modules/public/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/public/public.module').then(m => m.PublicModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'dashboard',
    title: 'InvestTrack | Dashboard',
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./modules/reset-password/reset-password.module').then(m => m.ResetPasswordModule),
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  { path: '**',
    redirectTo: 'not-found',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
