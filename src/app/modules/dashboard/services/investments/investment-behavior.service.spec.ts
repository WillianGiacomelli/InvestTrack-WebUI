/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { InvestmentBehaviorService } from './investment-behavior.service';

describe('InvestmentBehaviorService', () => {
  let service: InvestmentBehaviorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InvestmentBehaviorService],
    });
    service = TestBed.inject(InvestmentBehaviorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update investments using setInvestments', () => {
    const mockInvestments = [{ id: 1, name: 'Investment A' }, { id: 2, name: 'Investment B' }];
    service.setInvestments(mockInvestments);

    let receivedInvestments: any;
    service.$getInvestments().subscribe((investments) => {
      receivedInvestments = investments;
    });

    expect(receivedInvestments).toEqual(mockInvestments);
  });

  it('should emit null initially', () => {
    let initialValue: any;
    service.$getInvestments().subscribe((value) => {
      initialValue = value;
    });

    expect(initialValue).toBeNull();
  });

  it('should update isInvestmentLoading signal correctly', () => {
    expect(service.isInvestmentLoading()).toBe(true); // Initial value should be true

    service.isInvestmentLoading.set(false); // Update the signal
    expect(service.isInvestmentLoading()).toBe(false);
  });
});
