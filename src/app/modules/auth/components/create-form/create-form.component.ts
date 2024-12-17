import { AuthBehaviorService } from './../../services/authBehavior.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthHttpService } from '../../services/authHttp.service';
import { SignUpUserRequest } from '../../../../core/models/models';
import { ToastrService } from 'ngx-toastr';
import { ChangeDetectorRef } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent implements OnInit {
  public createModel!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _authBehaviorService: AuthBehaviorService,
    private _authHttpService: AuthHttpService,
    private toastService: ToastrService,
    private cdr: ChangeDetectorRef,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.createModel = this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      birthDate: [null, Validators.required],
      cpf: ['', Validators.required],
    })
  }

  public onDateSelect(date: { year: number; month: number; day: number }): void {
    const jsDate = new Date(date.year, date.month - 1, date.day);
    const formattedDate = this.datePipe.transform(jsDate, 'dd/MM/yyyy');
    this.createModel.setValue({
      birthDate: formattedDate,
    });

    this.createModel.updateValueAndValidity();

    this.cdr.detectChanges();
  }

  public handleCreateLoginSubmit(): void {
    if(this.createModel.valid){
      this._authHttpService.SignUpUser(this.createModel.value as SignUpUserRequest)
        .subscribe({
          next: (response) => {
            if(response){
              this.createModel.reset();
            }
          },
          complete: () => {
            this.toastService.success('Sua conta foi criada! Você já pode fazer login.', 'Sucesso',{
              progressBar: true,
            });
            this._authBehaviorService.toggleAuthTab('login');
          },
          error: (error) => {
            this.toastService.error(error.error.message, 'Erro',{
              progressBar: true,
            });
          }
        });
    }
  }
}
