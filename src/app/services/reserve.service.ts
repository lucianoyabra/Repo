import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { GLOBAL } from './global';
import { Reserve } from '../../app/models/reserve';

@Injectable()
export class ReserveService{
  public variable:string;
  public url: string;

  constructor(private _http: HttpClient){
    this.url = GLOBAL.url;
  }

  addReserve(reserve: Reserve){
    let params = JSON.stringify(reserve);
    let headers = new HttpHeaders({
      'content-type':'application/json'
    });
    return this._http.post(this.url + 'reserve', params, {headers:headers}).pipe(res=>res);
  }

  getReserves(token){
    let headers = new HttpHeaders({
      'content-type':'application/json',
      'authorization': token
    });

    return this._http.get(this.url + 'reserves', {headers:headers}).pipe(res=> res);
  }

  getReservesDate(token, date){
    let headers = new HttpHeaders({
      'content-type':'application/json',
      'authorization': token
    });

    return this._http.get(this.url + 'reserves/' + date, {headers:headers}).pipe(res=> res);
  }

  getReserve(token, id:string){
    let headers = new HttpHeaders({
      'content-type':'application/json',
      'authorization': token
    });

    return this._http.get(this.url + 'reserve/' + id, {headers:headers}).pipe(res=> res);
  }

  editReserve(token, id:string ,reserve: Reserve){
    let params = JSON.stringify(reserve);
    let headers = new HttpHeaders({
      'content-type':'application/json',
      'authorization': token
    });
    return this._http.put(this.url + 'reserve/' + id, params, {headers:headers}).pipe(res=>res);
  }

  deleteReserve(token, id: string){
    let headers = new HttpHeaders({
      'content-type':'application/json',
      'authorization': token
    });

    return this._http.delete(this.url + 'deleteReserve/' + id, {headers:headers}).pipe(res=> res);
  }

}
