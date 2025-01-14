import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../../../core/models/response/ApiResponse';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionHttpService {
  private API_URL = environment.API_URL

  constructor(
    private _http: HttpClient,
  ) { }

  public getWalletTransaction(walletId: number): Observable<ApiResponse<any>> {
    return this._http.get<ApiResponse<any>>(`${this.API_URL}/investment-transaction`, { params: { walletId: walletId.toString() } });
  }
}
