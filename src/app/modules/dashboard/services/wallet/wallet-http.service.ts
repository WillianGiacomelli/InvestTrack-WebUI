import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../../core/models/response/ApiResponse';
import { WalletResponse } from '../../../../core/models/wallet/response/walletResponse';

@Injectable({
  providedIn: 'root'
})
export class WalletHttpService {
  private API_URL = environment.API_URL

  constructor(
    private _http: HttpClient,
  ) { }

  public getWallet(userId: number): Observable<ApiResponse<WalletResponse>> {
    return this._http.get<ApiResponse<WalletResponse>>(`${this.API_URL}/wallet`, { params: { userId: userId.toString() } });
  }

  public postWallet(wallet: WalletResponse): Observable<ApiResponse<WalletResponse>> {
    return this._http.post<ApiResponse<WalletResponse>>(`${this.API_URL}/wallet`, wallet);
  }
}
