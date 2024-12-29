import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _cookie: CookieService
  ) { }

  public getAuthToken(): string {
    return this._cookie.get('token');
  }

  public getTokenExpirationDate(token: string): Date | null{
    const decoded = jwt_decode.jwtDecode(token);

    if (decoded.exp === undefined)
      return null;

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  public isTokenExpired(token?: string | null): boolean {
    const date = this.getTokenExpirationDate(token!);
    if(!date) return false;
    return !(date.valueOf() > new Date().valueOf());
  }

  public isUserAuthenticated(): boolean {
    const token =  this.getAuthToken()

    if(!token)
      return false;

    if(token && !this.isTokenExpired(token))
      return true;

    return false;
  }

  public SignOutUser(): void {
    this._cookie.delete('token');
  }

}
