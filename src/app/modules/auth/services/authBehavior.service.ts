import { Injectable, Signal, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthBehaviorService {
  private _authTab:WritableSignal< 'login' | 'create' | 'reset-password'> = signal('login');

  constructor() {
  }

  public toggleAuthTab$(): 'login' | 'create' | 'reset-password' {
    return this._authTab();
  }

  public toggleAuthTab(value: 'login' | 'create' | 'reset-password'): void {
    this._authTab.set(value);
  }

}
