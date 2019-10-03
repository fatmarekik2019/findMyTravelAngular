import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  header = new HttpHeaders().set('Authorization', 'Bearer '+ localStorage.getItem('token'));
  constructor(private _http: HttpClient) { }
  token = localStorage.getItem('token');

  addPublication(id,data){
    
    return this._http.post("http://localhost:9091/Publication/addPublication/"+id,data,{headers: this.header});
  }

  getAllMyPublication(id){
    return this._http.get("http://localhost:9091/Publication/getAllPublicationById/"+id,{headers: this.header})
  }
  getRecentPublication(){
    let headers = new HttpHeaders().set('Authorization', 'Bearer '+this.token);
    return this._http.get("http://localhost:9091/Publication/getRecentPublication", {headers : headers});
  }
  getActivatedPublication(){
    let headers = new HttpHeaders().set('Authorization', 'Bearer '+this.token);
    return this._http.get("http://localhost:9091/Publication/getActivatedPublication", {headers : headers});
  }

}
