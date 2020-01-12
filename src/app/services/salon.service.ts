import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { GLOBAL } from './global';
import { Salon } from '../../app/models/salon';

@Injectable()
export class SalonService{

  public url: string;

  constructor(private _http: HttpClient){
    this.url = GLOBAL.url;
  }

  addSalon(token, salon: Salon){
    let params = JSON.stringify(salon);
    console.log(params);
    alert(params);
    let headers = new HttpHeaders({
      'content-type':'application/json',
      'authorization': token
    });
    return this._http.post(this.url + 'salon', params, { headers }).pipe(res=>res);

  }

  getSalones(token, id){
    let headers = new HttpHeaders({
      'content-type':'application/json',
      'authorization': token
    });
    if (id != '' || id != null){
      return this._http.get(this.url + 'salones/' + id , {headers}).pipe(res => res);
    }else{
      return this._http.get(this.url + 'salones', {headers}).pipe(res => res);
    }

  }

  getSalon(token, id){
    let headers = new HttpHeaders({
      'content-type':'application/json',
      'authorization': token
    });

    return this._http.get(this.url + 'salon/' + id , {headers:headers}).pipe(res=> res);
  }


}
