import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthHttpService } from '../../auth/services/authHttp.service';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  public resetPasswordForm: FormGroup;
  public isLoading: boolean = false;
  public token!: string;

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _route: ActivatedRoute,
    private _toastService: ToastrService,
    private _authHttpService: AuthHttpService
  ) {
    this.resetPasswordForm = this._formBuilder.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
   }

  public checkPasswords() {
    if(this.resetPasswordForm.get('password')?.value != this.resetPasswordForm.get('confirmPassword')?.value){
      this.resetPasswordForm.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    }
    else{
      this.resetPasswordForm.get('confirmPassword')?.setErrors({ passwordMismatch: false });
    }
  }

  ngOnInit() {
    this._route.queryParams.subscribe(params => {
      this.token = params['token'] || '';
      console.log(this.token);
      if (!this.token) {
        this._toastService.error('Token não encontrado. Certifique-se de acessar o link correto.', 'Erro',{
          progressBar: true,
        })
      }
    });
  }

  public handleResetPasswordFormSubmit(): void {
    // if(this.resetPasswordForm.valid){
      this.isLoading = true;
      this._authHttpService
        .resetPassword(this.resetPasswordForm.get('confirmPassword')?.value, this.token)
        .subscribe({
          next: (response: any) => {
            console.log(response);
          },
          complete: () => {
            this.isLoading = false;
            this._toastService.success('Senha redefinida com sucesso', 'Sucesso', {
              progressBar: true,
            });
            setTimeout(() => {
              this._router.navigate(['auth']);
            }, 3000);
          },
          error: (error) => {
            this.isLoading = false;
            this._toastService.error(error.error.message, 'Erro', {
              progressBar: true,
            });
          }
        });
      // }
  }
}
