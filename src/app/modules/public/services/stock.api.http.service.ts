import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ApiResponse } from '../../../core/models/response/ApiResponse';
import { StockQuote } from '../../../core/models/quote/stock/StockQuote';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockApiHttpService {
  private BASE_API_URL:string = environment.API_URL;

  private API_URL = `${this.BASE_API_URL}/stock/quote`;

  constructor(
    private _http: HttpClient,
  ) { }

  public getStocks(): Observable<ApiResponse<StockQuote>> {
    return this._http.get<ApiResponse<StockQuote>>(this.API_URL);
  }
}
