import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../../core/models/response/ApiResponse';
import { Wallet } from '../../../../core/models/wallet/wallet';

@Injectable({
  providedIn: 'root'
})
export class WalletHttpService {
  private API_URL = environment.API_URL

  constructor(
    private _http: HttpClient,
  ) { }

  public getWallet(userId: number): Observable<ApiResponse<Wallet>> {
    return this._http.get<ApiResponse<Wallet>>(`${this.API_URL}/wallet`, { params: { userId: userId.toString() } });
  }
}
