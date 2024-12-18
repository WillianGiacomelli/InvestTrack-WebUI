import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StockApiHttpService {
  private BASE_API_URL:string = 'https://brapi.dev/api';

  private API_KEY:string = environment.BRAPI_TOKEN;

  private API_URL = `${this.BASE_API_URL}/quote/list?type=stock&sortBy=change&sortOrder=asc&limit=10`;

  constructor(
    private _http: HttpClient,
  ) { }

  getStocks(): any {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.API_KEY}`,
      'Content-Type': 'application/json'
    });
    return this._http.get(this.API_URL, { headers });
  }
}
