import { Injectable, signal, WritableSignal } from '@angular/core';
import { WalletResponse } from '../../../../core/models/wallet/response/walletResponse';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WalletBehaviorService {
  private _isLoadingWallet: WritableSignal<boolean> = signal(true);
  private _wallet: WritableSignal<WalletResponse | null> = signal(null);
  private _createdNewWallet: BehaviorSubject<boolean> = new BehaviorSubject(false);


  public getCreatedNewWallet(): Observable<boolean> {
    return this._createdNewWallet.asObservable();
  }

  public setCreatedNewWallet(created: boolean): void {
    this._createdNewWallet.next(created);
  }

  public getIsLoadingWallet(): boolean {
    return this._isLoadingWallet();
  }

  public setIsLoadingWallet(isLoading: boolean): void {
    this._isLoadingWallet.set(isLoading);
  }

  public getWallet(): WalletResponse | null {
    return this._wallet();
  }

  public setWallet(wallet: any): void {
    this._wallet.set(wallet);
  }
  constructor() { }

}
