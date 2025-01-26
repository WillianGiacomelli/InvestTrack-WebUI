/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { ApiResponse } from '../../../../../core/models/response/ApiResponse';
import { InvestmentCategoryResponse } from '../../../../../core/models/investment/category/InvestmentCategoryResponse';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { InvestmentsCategoryHttpService } from './investments-category-http.service';
import { environment } from '../../../../../../environments/environment';

describe('InvestmentsCategoryHttpService', () => {
  let service: InvestmentsCategoryHttpService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        InvestmentsCategoryHttpService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(InvestmentsCategoryHttpService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch investment categories', () => {
    const mockResponse: ApiResponse<InvestmentCategoryResponse> = {
      error: false,
      message: 'Categories retrieved successfully',
      data:
        [
          { id: 1, name: 'Stocks' },
          { id: 2, name: 'Bonds' },
        ],
    };

    service.getInvestmentCategory().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${environment.API_URL}/investment-category`);

    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
