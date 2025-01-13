import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../../../core/models/response/ApiResponse';
import { AssetRequest } from '../../../../../core/models/investment/asset/AssetRequest';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssetHttpService {
  private API_URL = environment.API_URL

  constructor(
    private _http: HttpClient,
  ) { }

  // public getWallet(userId: number): Observable<ApiResponse<WalletResponse>> {
  //   return this._http.get<ApiResponse<WalletResponse>>(`${this.API_URL}/wallet`, { params: { userId: userId.toString() } });
  // }

  public postAsset(asset: AssetRequest): Observable<ApiResponse<AssetRequest>> {
    return this._http.post<ApiResponse<AssetRequest>>(`${this.API_URL}/investment`, asset);
  }
}
