import { Component, inject, OnInit, signal, TemplateRef, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UserAuthenticationService } from '../../../../../../../../shared/services/userAuthentication.service';
import { WalletBehaviorService } from '../../../../../../services/wallet/wallet-behavior.service';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent {
  public addAssetForm!: FormGroup;
  private _modalService = inject(NgbModal);
  private _formBuilder: FormBuilder = inject(FormBuilder);
  private _userAuthenticationService: UserAuthenticationService = inject(UserAuthenticationService);
  private _toastService: ToastrService = inject(ToastrService);
  private _walletBehaviorService: WalletBehaviorService = inject(WalletBehaviorService);

  closeResult: WritableSignal<string> = signal('');

  constructor() {
    this.addAssetForm = this._formBuilder.group({
      ticker: ['',Validators.required],
      amount: ['',Validators.required],
      buyingPrice: ['',Validators.required],
      lastTransaction: ['',Validators.required],
      walletId: [this._walletBehaviorService.getWallet()!.id],
      categoryId: [1],
      brokerId: [1],
    });
  }

  open(content: TemplateRef<any>) {
    this._modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        // this._postWallet();
      }
    );
  }

  // private _postWallet() {
  //   this._walletHttpService.postWallet(this.addAssetForm.value)
  //   .subscribe({
  //     next: (res) => {
  //       this._walletBehaviorService.setCreatedNewWallet(true);
  //       this._toastService.success('Sua carteira de investimentos foi criada.', 'Sucesso',{
  //         progressBar: true,
  //       });
  //     },
  //     error: (error) => {
  //       this._walletBehaviorService.setCreatedNewWallet(false);
  //       this._toastService.error(error.error.message, 'Erro',{
  //         progressBar: true,
  //       });
  //     }
  //   })
  // }
}
