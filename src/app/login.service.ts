import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import * as JWT from "jwt-decode";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  userName: any;
  constructor(private _http: HttpClient, private router:Router) {
    this.userName = this.decodeToken();
   }

  login(data){
    let header = new HttpHeaders().set('Content-Type', 'application/json')
    return this._http.post("http://localhost:9090/user/login",data, {headers: header});
  }
  decodeToken() {
    
    if(localStorage.getItem('token')!=null){
      let token = localStorage.getItem('token');
      if(Date.now() >= (JWT(token)['exp']* 1000)){
        this.router.navigate(["/"]);
      }
      return JWT(token)['sub'];
    }else{
      this.router.navigate(["/"]);
    }
    
  }

}
