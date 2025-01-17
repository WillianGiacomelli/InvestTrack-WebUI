import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { ApiResponse } from '../../../../core/models/response/ApiResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvestmentHttpService {
    private API_URL = environment.API_URL

    constructor(
      private _http: HttpClient,
    ) { }

    public getWalletInvestments(walletId: number): Observable<ApiResponse<any>> {
      return this._http.get<ApiResponse<any>>(`${this.API_URL}/investment`, { params: { walletId: walletId.toString() } });
    }


}
