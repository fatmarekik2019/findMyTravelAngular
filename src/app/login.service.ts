import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _http: HttpClient) { }

  login(data){
    let header = new HttpHeaders().set('Content-Type', 'application/json')
    return this._http.post("http://localhost:9090/user/login",data, {headers: header});
  }
}
