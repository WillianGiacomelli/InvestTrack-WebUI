import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../../../core/models/response/ApiResponse';
import { InvestmentCategoryResponse } from '../../../../../core/models/investment/category/InvestmentCategoryResponse';

@Injectable({
  providedIn: 'root'
})
export class InvestmentsCategoryHttpService {
    private API_URL = environment.API_URL

    constructor(
      private _http: HttpClient,
    ) { }

    public getInvestmentCategory(): Observable<ApiResponse<InvestmentCategoryResponse>> {
      return this._http.get<ApiResponse<InvestmentCategoryResponse>>(`${this.API_URL}/investment-category`);
    }

}
