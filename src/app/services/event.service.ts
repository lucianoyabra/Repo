import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { GLOBAL } from './global';
import { Event } from '../../app/models/event';

@Injectable()
export class EventService{

  public url: string;

  constructor(private _http: HttpClient){
    this.url = GLOBAL.url;
  }

  getEvent(token, id:string){
    let headers = new HttpHeaders({
      'content-type':'application/json',
      'authorization': token
    });

    return this._http.get(this.url + 'event/' + id, {headers:headers}).pipe(res=> res);
  }

  deleteEvent(token, id:string){
    let headers = new HttpHeaders({
      'content-type':'application/json',
      'authorization': token
    });

    return this._http.delete(this.url + 'deleteEvent/' + id, {headers:headers}).pipe(res=> res);
  }


  getEvents(token, eventId = null, pagina){
    let headers = new HttpHeaders({
      'content-type':'application/json',
      'authorization': token
    });


      return this._http.get(this.url + 'events/' , {headers:headers}).pipe(res=> res);


  }

  addEvent(token, event:Event){
    let params = JSON.stringify(event);
    let headers = new HttpHeaders({
      'content-type':'application/json',
      'authorization': token
    });
    return this._http.post(this.url + 'event', params, {headers:headers}).pipe(res=>res);
  }

  editAlbum(token, id:string ,event:Event){
    let params = JSON.stringify(event);
    let headers = new HttpHeaders({
      'content-type':'application/json',
      'authorization': token
    });
    return this._http.put(this.url + 'updateEvent/' + id, params, {headers:headers}).pipe(res=>res);
  }

}
