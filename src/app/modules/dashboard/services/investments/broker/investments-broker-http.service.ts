import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../../../core/models/response/ApiResponse';
import { InvestmentCategoryResponse } from '../../../../../core/models/investment/category/InvestmentCategoryResponse';

@Injectable({
  providedIn: 'root'
})
export class InvestmentsBrokerHttpService {
    private API_URL = environment.API_URL

    constructor(
      private _http: HttpClient,
    ) { }

    public getInvestmentBroker(): Observable<ApiResponse<InvestmentCategoryResponse>> {
      return this._http.get<ApiResponse<InvestmentCategoryResponse>>(`${this.API_URL}/investment-broker`);
    }

}
