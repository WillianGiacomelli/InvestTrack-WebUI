import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardBehaviorService {
  private _dashboardTab: WritableSignal<"wallet" | "transactions"> = signal("wallet");

  public toggleDashboardTab$(): "wallet" | "transactions" {
    return this._dashboardTab();
  }

  public toggleDashboardTab(value: "wallet" | "transactions") {
    this._dashboardTab.set(value);
  }

  constructor() { }

}
