import { ApiResponse } from '../../../../../core/models/response/ApiResponse';
import { Wallet } from '../../../../../core/models/wallet/wallet';
import { WalletHttpService } from './../../../services/wallet/wallet-http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {

  constructor(
    private _walletHttpService: WalletHttpService
  ) { }

  ngOnInit() {
    this.getWallet()
  }

  public getWallet() {
    this._walletHttpService.getWallet(4)
    .subscribe((res:ApiResponse<Wallet>) => {
      if(!!res.data){

      }
    });
  }
}


