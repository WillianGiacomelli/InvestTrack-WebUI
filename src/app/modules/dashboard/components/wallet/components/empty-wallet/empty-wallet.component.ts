import { UserAuthenticationService } from './../../../../../../shared/services/userAuthentication.service';
import { Component, inject, OnInit, signal, TemplateRef, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WalletHttpService } from '../../../../services/wallet/wallet-http.service';
import { ToastrService } from 'ngx-toastr';
import { WalletBehaviorService } from '../../../../services/wallet/wallet-behavior.service';

@Component({
  selector: 'app-empty-wallet',
  templateUrl: './empty-wallet.component.html',
  styleUrls: ['./empty-wallet.component.scss']
})
export class EmptyWalletComponent {
  public createWalletForm!: FormGroup;
  private _modalService = inject(NgbModal);
  private _formBuilder: FormBuilder = inject(FormBuilder);
  private _userAuthenticationService: UserAuthenticationService = inject(UserAuthenticationService);
  private _toastService: ToastrService = inject(ToastrService);
  private _walletHttpService: WalletHttpService = inject(WalletHttpService);
  private _walletBehaviorService: WalletBehaviorService = inject(WalletBehaviorService);

	closeResult: WritableSignal<string> = signal('');

  constructor() {
    console.log(this._userAuthenticationService.getUserAuthenticated)
    this.createWalletForm = this._formBuilder.group({
      name: ['',Validators.required],
      id: [this._userAuthenticationService.getUserAuthenticated.id],
    });
  }

	open(content: TemplateRef<any>) {
		this._modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
        this._postWallet();
			}
		);
	}

  private _postWallet() {
    this._walletHttpService.postWallet(this.createWalletForm.value)
    .subscribe({
      next: (res) => {
        this._walletBehaviorService.setCreatedNewWallet(true);
        this._toastService.success('Sua carteira de investimentos foi criada.', 'Sucesso',{
          progressBar: true,
        });
      },
      error: (error) => {
        this._walletBehaviorService.setCreatedNewWallet(false);
        this._toastService.error(error.error.message, 'Erro',{
          progressBar: true,
        });
      }
    })
  }

}
