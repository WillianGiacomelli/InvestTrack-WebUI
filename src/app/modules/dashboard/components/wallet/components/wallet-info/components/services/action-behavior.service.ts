import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActionBehaviorService {
  private _isDataChanged: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public getIsDataChanged(): Observable<boolean> {
    return this._isDataChanged.asObservable();
  }

  public setIsDataChanged(isChanged: boolean): void {
    this._isDataChanged.next(isChanged);
  }

  constructor() { }

}
