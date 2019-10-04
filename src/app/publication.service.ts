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
    
    return this._http.get("http://localhost:9091/Publication/getRecentPublication", {headers : this.header});
  }
  getActivatedPublication(){
    
    return this._http.get("http://localhost:9091/Publication/getActivatedPublication", {headers : this.header});
  }

}
