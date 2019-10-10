import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private _http: HttpClient) { }
  header = new HttpHeaders().set('Authorization', 'Bearer '+ localStorage.getItem('token'));
  
  get(userName){
    return this._http.get("http://localhost:9090/Client/getProfile/"+userName,{headers: this.header});
  }
  put(data){
    return this._http.put('http://localhost:9090/Client/update',data,{headers: this.header});
  }
  post(data,userName){
    return this._http.post('http://localhost:9090/user/resetPassword/'+userName,data,{headers: this.header})
  }
  getConfirmPassword(userName,data){
    return this._http.post('http://localhost:9090/user/checkPassword/'+userName,data,{headers: this.header});
  }
  postImage(file,id){
    return this._http.post('http://localhost:9090/uploadFile/'+id,file,{headers: this.header});
  }
  updateCompanyProfile(data){
    return this._http.post("http://localhost:9090/Company/update",data,{headers: this.header});
  }
}
  