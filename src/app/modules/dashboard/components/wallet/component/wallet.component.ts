import { ToastrService } from 'ngx-toastr';
import { ApiResponse } from '../../../../../core/models/response/ApiResponse';
import { WalletResponse } from '../../../../../core/models/wallet/response/walletResponse';
import { WalletBehaviorService } from '../../../services/wallet/wallet-behavior.service';
import { WalletHttpService } from './../../../services/wallet/wallet-http.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserAuthenticationService } from '../../../../../shared/services/userAuthentication.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit, OnDestroy {
  public title: string = 'Dashboard';
  public subtitle: string = 'Inicio';
  private _unsubscribe$ = new Subject<void>();

  constructor(
    private _walletHttpService: WalletHttpService,
    public walletBehaviorService: WalletBehaviorService,
    public toastService: ToastrService,
    private _userAuthenticationService: UserAuthenticationService,
  ) { }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  ngOnInit() {
    if(this.walletBehaviorService.getWallet() == null) this.getWallet();

    this.walletBehaviorService
      .getCreatedNewWallet()
      .subscribe(response =>{
        if(response){
          this.getWallet();
        }
    });
  }

  public getWallet() {
    this._walletHttpService.getWallet(this._userAuthenticationService.getUserAuthenticated.id)
    .subscribe({
      next: (res:ApiResponse<WalletResponse>) => {
        if(res.data == null){
          this.walletBehaviorService.setWallet(null);
          return;
        }
        this.walletBehaviorService.setWallet(res.data);
        this.subtitle = "Carteira"
      },
      complete: () => {
        this.walletBehaviorService.setIsLoadingWallet(false);
      },
      error: (error) => {
        this.walletBehaviorService.setIsLoadingWallet(false);
        this.toastService.error(error.error.message, 'Erro',{
          progressBar: true,
        });
      }
    });
  }
}


