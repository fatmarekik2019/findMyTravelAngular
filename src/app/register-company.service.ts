import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterCompanyService {

  constructor(private _http: HttpClient) { }

  post(data){
    return this._http.post("http://localhost:9090/Company/addCompany",data);
  }
}
