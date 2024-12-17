import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard{

  constructor(
    private _userHttpService: AuthService,
    private _router: Router
  ) { }

  public canActivate(): Observable<boolean | UrlTree> | boolean {
    return new Observable<boolean>(obs => {
      if (this._userHttpService.isUserAuthenticated()) {
        obs.next(true);
      } else {
        this._router.navigate(['auth']);
        obs.next(false);
      }
    });
  }
}
