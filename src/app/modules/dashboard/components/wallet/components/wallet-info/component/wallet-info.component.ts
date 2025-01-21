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
  public walletName: string = '';
  public investments: any;
  public displayedInvestments: any[] = [];
  public dashboard: any;
  public investmentBehaviorService: InvestmentBehaviorService = inject(InvestmentBehaviorService);
  public walletBehaviorService: WalletBehaviorService = inject(WalletBehaviorService);
  //chart
  public view: [number, number] = [400, 400];
  public chart: any[] = [];

  public currentPage: number = 1;
  public pageSize: number = 5;
  public totalPages: number = 0;

  constructor() { }

  ngOnInit() {
    this.walletName = this.walletBehaviorService.getWallet()![0].name;
    this._getInvestments();
  }

  private _getInvestments(){
    this.investmentBehaviorService.$getInvestments()
      .subscribe((response) => {
        if(!!response){
          this.investments = response.investments;
          this.dashboard = response.dashboard;
          this.chart = response.dashboard.chart

          this.calculatePagination();
        }
      });
  }

   // Calcula o número total de páginas
   private calculatePagination(): void {
    this.totalPages = Math.ceil(this.investments.length / this.pageSize);
    this.updateDisplayedInvestments();
  }

  // Atualiza os investimentos exibidos na página atual
  private updateDisplayedInvestments(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedInvestments = this.investments.slice(startIndex, endIndex);
  }

  // Altera a página atual e atualiza os dados exibidos
  public changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateDisplayedInvestments();
    }
  }

}
