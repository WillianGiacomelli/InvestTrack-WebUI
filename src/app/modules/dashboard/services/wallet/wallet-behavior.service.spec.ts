/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { WalletBehaviorService } from './wallet-behavior.service';

describe('WalletBehaviorService', () => {
  let service: WalletBehaviorService;

  beforeEach(() => {
    service = new WalletBehaviorService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get and set the created wallet state', () => {
    const initialCreatedState = false;
    const newCreatedState = true;

    service.getCreatedNewWallet().subscribe((state) => {
      expect(state).toBe(initialCreatedState);
    });

    service.setCreatedNewWallet(newCreatedState);
    service.getCreatedNewWallet().subscribe((state) => {
      expect(state).toBe(newCreatedState);
    });
  });

  it('should get and set the loading state', () => {
    const initialLoadingState = true;
    const newLoadingState = false;

    expect(service.getIsLoadingWallet()).toBe(initialLoadingState);

    service.setIsLoadingWallet(newLoadingState);
    expect(service.getIsLoadingWallet()).toBe(newLoadingState);
  });

  it('should get and set the wallet data', () => {
    const walletData = [{ id: 1, name: 'My Wallet' }];

    expect(service.getWallet()).toBeNull();

    service.setWallet(walletData);
    expect(service.getWallet()).toEqual(walletData);
  });
});
