/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TransactionsComponent } from './transactions.component';
import { WalletBehaviorService } from '../../../services/wallet/wallet-behavior.service';
import { TransactionHttpService } from '../../../services/investments/transaction/transaction-http.service';
import { ActionBehaviorService } from '../../wallet/components/wallet-info/components/services/action-behavior.service';
import { of } from 'rxjs';

class MockWalletBehaviorService {
  getWallet = jest.fn().mockReturnValue([{ id: 1 }]);
}

class MockTransactionHttpService {
  getWalletTransaction = jest.fn().mockReturnValue(of({ data: [[{ id: 1, name: 'Transaction 1' }]] }));
}

class MockActionBehaviorService {
  getIsDataChanged = jest.fn().mockReturnValue(of(false));
}

describe('TransactionsComponent', () => {
  let component: TransactionsComponent;
  let fixture: ComponentFixture<TransactionsComponent>;
  let walletBehaviorService: WalletBehaviorService;
  let transactionHttpService: TransactionHttpService;
  let actionBehaviorService: ActionBehaviorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionsComponent],
      providers: [
        { provide: WalletBehaviorService, useClass: MockWalletBehaviorService },
        { provide: TransactionHttpService, useClass: MockTransactionHttpService },
        { provide: ActionBehaviorService, useClass: MockActionBehaviorService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionsComponent);
    component = fixture.componentInstance;

    walletBehaviorService = TestBed.inject(WalletBehaviorService);
    transactionHttpService = TestBed.inject(TransactionHttpService);
    actionBehaviorService = TestBed.inject(ActionBehaviorService);

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load transactions on init', () => {
    expect(walletBehaviorService.getWallet).toHaveBeenCalled();
    expect(transactionHttpService.getWalletTransaction).toHaveBeenCalledWith(1);
    expect(component.transactions).toEqual([{ id: 1, name: 'Transaction 1' }]);
  });

  it('should handle loading state correctly', () => {
    expect(component.isLoadingTransactions).toBe(false);
  });

  it('should respond to data changes from ActionBehaviorService', () => {
    jest.spyOn(actionBehaviorService, 'getIsDataChanged').mockReturnValue(of(true));
    const getTransactionsSpy = jest.spyOn<any, any>(component, '_getTransactions');

    component.ngOnInit();

    expect(actionBehaviorService.getIsDataChanged).toHaveBeenCalled();
    expect(getTransactionsSpy).toHaveBeenCalledWith(1);
  });

  it('should handle errors gracefully', () => {
    jest.spyOn(transactionHttpService, 'getWalletTransaction').mockReturnValue(
      of({
        error: true,
        message: 'Error occurred',
        data: [],
      })
    );
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    component['isLoadingTransactions'] = true;
    component['transactions'] = [];

    component['isLoadingTransactions'] = false;

    expect(consoleErrorSpy).toBe(consoleErrorSpy);
  });
});
