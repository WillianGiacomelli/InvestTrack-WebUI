import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetPasswordComponent } from './component/reset-password.component';
import { ResetPasswordRoutes } from './reset-password.routing';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ResetPasswordRoutes,
    ReactiveFormsModule
  ],
  declarations: [ResetPasswordComponent]
})
export class ResetPasswordModule { }
