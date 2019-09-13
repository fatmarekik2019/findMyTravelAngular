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
}
