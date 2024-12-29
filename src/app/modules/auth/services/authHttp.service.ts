import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { SignInUserRequest, SignUpUserRequest, SignUpUserResponse } from '../../../core/models/models';
import { Observable } from 'rxjs';
import { SignInUserResponse } from '../../../core/models/auth/SignInUserResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpService {
  private _API_URL = environment.API_URL;

  constructor(
    private _http: HttpClient,
  ) { }

  public SignUpUser(user: SignUpUserRequest) : Observable<SignUpUserResponse>{
    return this._http.post<SignUpUserResponse>(`${this._API_URL}/user`, user);
  }

  public SignInUser(user: SignInUserRequest) : Observable<SignInUserResponse>{
    return this._http.post<SignInUserResponse>(`${this._API_URL}/auth`, user);
  }

  public ResetPasswordRequest(email: string): Observable<any>{
    return this._http.post(`${this._API_URL}/auth/reset-password-request`, {email});
  }

  public resetPassword(password: string, token: string): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this._http.post(
      `${this._API_URL}/auth/reset-password`,
      { password, token },
      { headers }
    );
  }
}
