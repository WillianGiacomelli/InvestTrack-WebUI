import { Component, OnInit } from '@angular/core';
import { StockApiHttpService } from '../../../services/stock.api.http.service';
import { StockQuote } from '../../../../../core/models/quote/stock/StockQuote';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-stock-section',
  templateUrl: './stock-section.component.html',
  styleUrls: ['./stock-section.component.scss']
})
export class StockSectionComponent implements OnInit {
  stockAscCloseQuote: StockQuote[] = [];
  stockDescCloseQuote: StockQuote[] = [];
  fundDescCloseQuote: StockQuote[] = [];
  fundAscCloseQuote: StockQuote[] = [];
  cryptoCloseQuote: any[] = [];
  groupedCryptos: any[][] = [];
  isLoadingStocks: boolean = false;

  constructor(
    private _stockHttpService: StockApiHttpService,
      private toastService: ToastrService,
  ) { }

  ngOnInit() {
    this.getStocks();
  }

  private getStocks() {
    this.isLoadingStocks = true;
    this._stockHttpService.getStocks()
      .subscribe({
        next: (res: any) => {
          if (res.data && res.data.length > 0) {
            this.stockAscCloseQuote = res.data[0].stocks.higher;
            this.stockDescCloseQuote = res.data[0].stocks.lower;
            this.fundAscCloseQuote = res.data[0].funds.higher;
            this.fundDescCloseQuote = res.data[0].funds.lower;
            this.cryptoCloseQuote = res.data[0].cryptos
            this.groupedCryptos = this.groupCryptos(this.cryptoCloseQuote, 5);
            console.log(this.groupedCryptos);
          }
        },
        complete: () => {
          this.isLoadingStocks = false;
        },
        error: (error) => {
          this.toastService.error(error.error.message, 'Erro',{
            progressBar: true,
          });
        }
      });
  }

  private groupCryptos(cryptos: any[], itemsPerGroup: number): any[][] {
    const groups: any[][] = [];
    for (let i = 0; i < cryptos.length; i += itemsPerGroup) {
      groups.push(cryptos.slice(i, i + itemsPerGroup));
    }
    return groups;
  }
}
