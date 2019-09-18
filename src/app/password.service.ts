import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor(private http: HttpClient) { }

  forgotPassword(email,data){
    return this.http.post("http://localhost:9090/user/forgotPassword/"+email, data);
  }
  resetPassword(userName,datas){
    return this.http.post("http://localhost:9090/user/resetPassword/"+userName, datas);
  }
}
