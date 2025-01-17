/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InvestmentHttpService } from './investment-http.service';

describe('Service: InvestmentHttp', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InvestmentHttpService]
    });
  });

  it('should ...', inject([InvestmentHttpService], (service: InvestmentHttpService) => {
    expect(service).toBeTruthy();
  }));
});
