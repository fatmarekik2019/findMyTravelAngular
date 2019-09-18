import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private _http: HttpClient) { }

  get(userName){
    return this._http.get("http://localhost:9090/Client/getProfile/"+userName);
  }
  put(data){
    return this._http.put('http://localhost:9090/Client/update',data);
  }
  post(data,userName){
    return this._http.post('http://localhost:9090/user/resetPassword/'+userName,data)
  }
  getConfirmPassword(userName,data){
    return this._http.post('http://localhost:9090/user/checkPassword/'+userName,data);
  }
}
  