import { Component, OnInit } from '@angular/core';
import { AuthBehaviorService } from '../../../services/authBehavior.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthHttpService } from '../../../services/authHttp.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  public resetEmailForm: FormGroup;
  public isLoading: boolean = false;

  constructor(
    public loginService:AuthBehaviorService,
    private _formBuilder: FormBuilder,
    private toastService: ToastrService,
    private _authHttpService: AuthHttpService
  ) {
    this.resetEmailForm = this._formBuilder.group({
      email: ['', Validators.required]
    });
   }

  ngOnInit() {
  }

  public handleResetEmailFormSubmit(): void {
    this.isLoading = true;
    if(this.resetEmailForm.valid){
      this._authHttpService.ResetPasswordRequest(this.resetEmailForm.value)
      .subscribe({
        next: (response: any) => {

        },
        complete: () => {
          this.isLoading = false;
          this.toastService.success('Email de redefinição de senha enviado', 'Sucesso',{
            progressBar: true,
          });
        },
        error: (error) => {
          this.isLoading = false;
          this.toastService.error(error.error.message, 'Erro',{
            progressBar: true,
          })
        }
      })
    }
  }

}
