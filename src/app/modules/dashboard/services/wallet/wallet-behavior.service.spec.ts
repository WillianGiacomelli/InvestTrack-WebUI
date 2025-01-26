/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { WalletBehaviorService } from './wallet-behavior.service';

describe('Service: WalletBehavior', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WalletBehaviorService]
    });
  });

  it('should ...', inject([WalletBehaviorService], (service: WalletBehaviorService) => {
    expect(service).toBeTruthy();
  }));
});
