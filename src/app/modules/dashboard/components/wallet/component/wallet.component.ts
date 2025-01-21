import { ToastrService } from 'ngx-toastr';
import { ApiResponse } from '../../../../../core/models/response/ApiResponse';
import { WalletResponse } from '../../../../../core/models/wallet/response/walletResponse';
import { WalletBehaviorService } from '../../../services/wallet/wallet-behavior.service';
import { WalletHttpService } from './../../../services/wallet/wallet-http.service';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { UserAuthenticationService } from '../../../../../shared/services/userAuthentication.service';
import { Subject } from 'rxjs';
import { InvestmentHttpService } from '../../../services/investments/investment-http.service';
import { InvestmentBehaviorService } from '../../../services/investments/investment-behavior.service';
import { ActionBehaviorService } from '../components/wallet-info/components/services/action-behavior.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnDestroy, OnInit {
  public title: string = 'Dashboard';
  public subtitle: string = 'Inicio';
  private _unsubscribe$ = new Subject<void>();

  constructor(
    private _walletHttpService: WalletHttpService,
    public walletBehaviorService: WalletBehaviorService,
    public toastService: ToastrService,
    private _actionBehaviorService: ActionBehaviorService,
    private _userAuthenticationService: UserAuthenticationService,
    private _investmentHttpService: InvestmentHttpService,
    private _investmentBehaviorService: InvestmentBehaviorService
  ) { }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  ngOnInit() {
    const userId = this._userAuthenticationService.getUserAuthenticated.id;
    if(this.walletBehaviorService.getWallet() == null) {
      if(userId){
        this.getWallet(userId);
      }
    }

    this.walletBehaviorService
      .getCreatedNewWallet()
      .subscribe(response =>{
        if(response){
          this.getWallet(userId);
        }
    });

    this._actionBehaviorService
      .getIsDataChanged()
      .subscribe(response => {
        if(response){
          this._getWalletInvestments();
        }
      });
  }

  public getWallet(userId: number) {

    this._walletHttpService.getWallet(userId)
    .subscribe({
      next: (res:ApiResponse<WalletResponse>) => {
        if(res.data == null){
          this.walletBehaviorService.setWallet(null);
          return;
        }
        this.walletBehaviorService.setWallet(res.data);
        this._getWalletInvestments();
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
  private _getWalletInvestments() {
    const wallet = this.walletBehaviorService.getWallet();
    const walletId = wallet![0].id;
    this._investmentHttpService.getWalletInvestments(walletId)
    .subscribe({
      next: (res: ApiResponse<any>) => {
        this._investmentBehaviorService.isInvestmentLoading.set(false)
        this._investmentBehaviorService.setInvestments(res.data[0]);
        console.log(res.data[0]);
      },
      error: (error) => {
        this.toastService.error(error.error.message, 'Erro',{
          progressBar: true,
        });
      }
    })
  }
}


