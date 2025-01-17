import { Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvestmentBehaviorService {
  private _investments: BehaviorSubject<any> = new BehaviorSubject(null);
  public isInvestmentLoading: WritableSignal<boolean> = signal(true);

  public setInvestments(investments: any): void {
    this._investments.next(investments);
  }

  public $getInvestments(): Observable<any> {
    return this._investments.asObservable();
  }

  constructor() { }

}
