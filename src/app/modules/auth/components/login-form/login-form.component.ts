import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthHttpService } from '../../services/authHttp.service';
import { SignInUserRequest, SignInUserResponse } from '../../../../core/models/models';
import Swal from 'sweetalert2'
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  public loginForm!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _authHttpService: AuthHttpService,
    private _cookieService: CookieService,
    private _router: Router,
    private toastService: ToastrService
  ) { }

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public handleLoginFormSubmit(): void {
    if(this.loginForm.valid){
      this._authHttpService.SignInUser(this.loginForm.value as SignInUserRequest)
      .subscribe({
        next: (response: SignInUserResponse) => {
          if(response){
            this._cookieService.set('token', response?.auth.token);
            this.loginForm.reset();
            this._router.navigate(['dashboard']);
          }
        },
        error: (error) => {
          this.toastService.error(error.error.message, 'Erro',{
            progressBar: true,
          })
        }
      })
    }
  }
}
