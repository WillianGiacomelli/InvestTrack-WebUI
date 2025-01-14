import { Component, inject, OnInit } from '@angular/core';
import { TransactionHttpService } from '../../../services/investments/transaction/transaction-http.service';
import { WalletBehaviorService } from '../../../services/wallet/wallet-behavior.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  public isLoadingTransactions: boolean = false;
  public transactions: any[] = [];
  private _walletBehaviorService: WalletBehaviorService = inject(WalletBehaviorService);
  private _transactionHttpService:TransactionHttpService = inject(TransactionHttpService);

  constructor() { }

  ngOnInit() {
    const wallet = this._walletBehaviorService.getWallet();
    const walletId = wallet![0].id;
    this._getTransactions(walletId);
  }

  private _getTransactions(walletId: number) {
    this._transactionHttpService.getWalletTransaction(walletId)
      .subscribe({
        next: (response) => {
          this.transactions = response.data[0];
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

}
