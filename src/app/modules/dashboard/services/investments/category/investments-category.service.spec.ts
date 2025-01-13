/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';

describe('Service: InvestmentsCategory', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: const [InvestmentsCategoryService]
    });
  });

  it('should ...', inject([InvestmentsCategoryService], (service: InvestmentsCategoryService) => {
    expect(service).toBeTruthy();
  }));
});
