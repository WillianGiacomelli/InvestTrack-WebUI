import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthHttpService } from '../../modules/auth/services/authHttp.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticationService {
  private _isUserAuthenticated: WritableSignal<boolean> = signal(false);
  private _userAuthenticated: WritableSignal<any> = signal({});
  private _cookieService = inject(CookieService);
  private _authService = inject(AuthHttpService);

  constructor(
  ) {
    this.checkToken();
   }

  public logout(): void {
    this._cookieService.delete('token');
    this.setUserAuthenticated({});
    this.setIsUserAuthenticated(false);
  }

  public get getUserAuthenticated(): any {
    return this._userAuthenticated();
  }

  public setUserAuthenticated(userInfo: any): void {
    this._userAuthenticated.set(userInfo);
  }

  public setIsUserAuthenticated(value: boolean): void {
    this._isUserAuthenticated.set(value);
  }

  public get isUserAuthenticated(): boolean {
    return this._isUserAuthenticated();
  }

  public async checkToken(): Promise<void> {
    if (!!this._cookieService.check('token') && !this.isUserAuthenticated) {
        this._authService.checkToken(this._cookieService.get('token'))
          .subscribe({
            next: (response: any) => {
              if(response && response.data[0]){
                this.setIsUserAuthenticated(response.data[0].isAuthenticated);
                this.setUserAuthenticated(response.data[0].user);
              }
            },
            error: (error: any) => {
              this.setIsUserAuthenticated(error.data[0].isAuthenticated);
            },
        });
      }
  }
}
