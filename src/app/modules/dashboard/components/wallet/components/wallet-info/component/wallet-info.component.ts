import { Component, inject, OnInit } from '@angular/core';
import { InvestmentBehaviorService } from '../../../../../services/investments/investment-behavior.service';
import { WalletBehaviorService } from '../../../../../services/wallet/wallet-behavior.service';

@Component({
  selector: 'app-wallet-info',
  templateUrl: './wallet-info.component.html',
  styleUrls: ['./wallet-info.component.scss']
})
export class WalletInfoComponent implements OnInit {
  public options: any = {
    edit: false,
    delete: false,
    add: true,
  }
  public investments: any;
  public dashboard: any;
  public investmentBehaviorService: InvestmentBehaviorService = inject(InvestmentBehaviorService);
  private walletBehaviorService: WalletBehaviorService = inject(WalletBehaviorService);

  constructor() { }

  ngOnInit() {
    this.investmentBehaviorService.$getInvestments()
      .subscribe((response) => {
        this.investments = response.investments;
        this.dashboard = response.dashboard;
      });
  }

}
