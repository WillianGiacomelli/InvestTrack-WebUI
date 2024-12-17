import { Injectable, Signal, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthBehaviorService {
  private _authTab:WritableSignal< 'login' | 'create'> = signal('login');

  constructor() {
  }

  public toggleAuthTab$(): 'login' | 'create' {
    return this._authTab();
  }

  public toggleAuthTab(value: 'login' | 'create') {
    this._authTab.set(value);
  }

}
