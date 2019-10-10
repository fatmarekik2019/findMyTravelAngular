import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  header = new HttpHeaders().set('Authorization', 'Bearer '+ localStorage.getItem('token'));
  constructor(private _http: HttpClient) { }

  addPublication(id,data){
    
    return this._http.post("http://localhost:9090/Publication/addPublication/"+id,data,{headers: this.header});
  }

  getAllMyPublication(id){
    return this._http.get("http://localhost:9090/Publication/getAllPublicationById/"+id,{headers: this.header})
  }

  editPublication(id,data){
    console.log(id)
    console.log(data)
    return this._http.post("http://localhost:9090/Publication/editPublication/"+id,data,{headers: this.header})
  }
  changeStatus(data){
    return this._http.post("http://localhost:9090/Publication/changeStatus",data,{headers: this.header})
  }
  deletePublication(data){
    return this._http.post("http://localhost:9090/Publication/deletePublication",data,{headers: this.header})
  }
  getAllActivePublication(){
    return this._http.get("http://localhost:9090/Publication/getAll",{headers: this.header})
  }
}
