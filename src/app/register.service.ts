import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private _http: HttpClient) { }

  registerClient(data){
    console.log(data);
    return this._http.post("http://localhost:9090/Client/addClient",data);
  }
}
