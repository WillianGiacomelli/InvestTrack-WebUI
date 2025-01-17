/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InvestmentBehaviorService } from './investment-behavior.service';

describe('Service: InvestmentBehavior', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InvestmentBehaviorService]
    });
  });

  it('should ...', inject([InvestmentBehaviorService], (service: InvestmentBehaviorService) => {
    expect(service).toBeTruthy();
  }));
});
