import { Component, OnInit } from '@angular/core';
import { StockApiHttpService } from '../../services/stock.api.http.service';

@Component({
  selector: 'app-stock-section',
  templateUrl: './stock-section.component.html',
  styleUrls: ['./stock-section.component.scss']
})
export class StockSectionComponent implements OnInit {

  constructor(
    private _stockHttpService: StockApiHttpService
  ) { }

  ngOnInit() {
    this._stockHttpService.getStocks().subscribe((res:any) => {
      console.log(res);
    })
  }

}
