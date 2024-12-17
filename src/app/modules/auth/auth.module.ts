import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthRoutes } from './auth.routing';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { CreateFormComponent } from './components/create-form/create-form.component';
import { LoginComponent } from './component/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

import { ToastrModule } from 'ngx-toastr';
import { CpfPipe } from '../../core/pipes/cpf.pipe';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutes,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    NgbDatepickerModule
  ],
  declarations: [
    LoginComponent,
    LoginFormComponent,
    CreateFormComponent,
    CpfPipe
  ],
  exports: [LoginComponent],
  providers: [DatePipe]
})
export class AuthModule { }
