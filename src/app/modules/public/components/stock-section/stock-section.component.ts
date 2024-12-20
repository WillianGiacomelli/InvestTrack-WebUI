import { Component, OnInit } from '@angular/core';
import { StockApiHttpService } from '../../services/stock.api.http.service';
import { StockQuote } from '../../../../core/models/quote/stock/StockQuote';
import { ApiResponse } from '../../../../core/models/response/ApiResponse';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-stock-section',
  templateUrl: './stock-section.component.html',
  styleUrls: ['./stock-section.component.scss']
})
export class StockSectionComponent implements OnInit {
  stockAscCloseQuote: StockQuote[] = [];
  stockDescCloseQuote: StockQuote[] = [];
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
            this.stockAscCloseQuote = res.data[0].higher;
            this.stockDescCloseQuote = res.data[0].lower;
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
}
