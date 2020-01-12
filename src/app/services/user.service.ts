import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { GLOBAL } from './global';
// import { jsonpFactory } from '@angular/http/src/http_module';

@Injectable()

export class UserService{

  public url: string;
  public identity;
  public token;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;

  }

  try(){

    let headers  =  new HttpHeaders({ 'Content-Type': 'application/json' });//new HttpHeaders({'Content-Type': 'text/xml'});
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Origin', 'http://agssistemas.dynu.net:8082/*');
    headers.append('Access-Control-Allow-Headers', "X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding");
    return this._http.get('http://agssistemas.dynu.net:8082/api/api/articulos', {headers: headers}).pipe(res => res);
  }

  signUp(user_to_login, gethash = null ){
    if (gethash != null){
      user_to_login.gethash = gethash;
    }
    let json = JSON.stringify(user_to_login);
    let params = json;
    let headers  = new HttpHeaders({'Content-Type': 'application/json'});
    return this._http.post(this.url + 'login', params, {headers: headers}).pipe(res => res);

  }

  getUser(user_to_login, gethash = null ){
    if (gethash != null){
      user_to_login.gethash = gethash;
    }
    let params = '5dd44d199092ea3f40388009';
    let headers  = new HttpHeaders({'Content-Type': 'application/json'});
    return this._http.get(this.url + 'getUser/' + params, {headers: headers}).pipe(res => res);

  }

  updateUser(user_to_update){
    let params = JSON.stringify(user_to_update);
    let headers  = new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': this.getToken()
            });
    return this._http.put(this.url + 'update-user/' + user_to_update._id, params, {headers: headers}).pipe(res => res);


  }

  register(user_to_register){

    let params = JSON.stringify(user_to_register);
    let headers  = new HttpHeaders({'Content-Type': 'application/json'});
    return this._http.post(this.url + 'register', params, {headers: headers}).pipe(res => res);

  }

  getIdentity(){
    let identity = JSON.parse(localStorage.getItem('identity'));
    if(identity != 'undefined'){
      this.identity = identity;
    }else{
      this.identity = null;
    }
    return this.identity;
  }

  getToken(){
    let token = localStorage.getItem('token');
    if(token != 'undefined'){
      this.token = token;
    }else{
      this.token = null;
    }
    return this.token;
  }


}
