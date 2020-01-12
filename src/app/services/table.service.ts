import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { GLOBAL } from './global';
import { Table } from '../../app/models/table';


@Injectable()
export class TableService{

  public url: string;

  constructor(private _http: HttpClient){
    this.url = GLOBAL.url;
  }

  getTable(token, id){

    let headers = new HttpHeaders({
      'content-type':'application/json',
      'authorization': token
    });

    return this._http.get(this.url + 'table/' + id, {headers:headers}).pipe(res=>res);
  }

  deleteTable(token, id){

    let headers = new HttpHeaders({
      'content-type':'application/json',
      'authorization': token
    });
    alert('hola');
    if (id != null){
      return this._http.delete(this.url + 'table/' + id, {headers:headers}).pipe(res=>res);
    }else{
      return this._http.delete(this.url + 'table/', {headers:headers}).pipe(res=>res);
    }
  }

  getTables(token,id){

    let headers = new HttpHeaders({
      'content-type':'application/json',
      'authorization': token
    });

    if (id == null) {
      return this._http.get(this.url + 'tables', {headers:headers}).pipe(res=>res);
    }else {
      return this._http.get(this.url + 'tables/' + id, {headers:headers}).pipe(res=>res);
    }




  }

  editTable(token, id, table:Table){
    let params = JSON.stringify(table);
    let headers = new HttpHeaders({
      'content-type':'application/json',
      'authorization': token
    });

    return this._http.put(this.url + 'table/' + id, params ,{headers:headers}).pipe(res=>res);
  }

  addTable(token, table:Table){
    let params = JSON.stringify(table);
    let headers = new HttpHeaders({
      'content-type':'application/json',
      'authorization': token
    });
    return this._http.post(this.url + 'table', params, {headers:headers}).pipe(res=>res);
  }

}
