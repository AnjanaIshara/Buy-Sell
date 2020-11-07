import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Users } from './users';
import { LoginDetails } from './login-details';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {
  ServerUrl: string;
  _url: string;
  _LoginUrl: string;
  constructor(private _http: HttpClient,
    sharedService: SharedService) {
    this.ServerUrl = sharedService.getServer();
    this._url = this.ServerUrl.concat('/confirm');
    this._LoginUrl = this.ServerUrl.concat('/login');;
  }
  confirm(user: Users) {

    return this._http.post<any>(this._url, user);
  }
  login(credentials: LoginDetails) {
    return this._http.post<any>(this._LoginUrl, credentials);
  }

}
