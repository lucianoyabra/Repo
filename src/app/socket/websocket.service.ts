import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, BehaviorSubject, Subscriber } from 'rxjs';
import { Reserve } from '../models/reserve';
// import { port, portSocket } from '../../../server/index.js';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  socket: any;
  // readonly uri = "http://localhost:3000/";
   readonly uri = "/";

  constructor() {
    this.socket = io(this.uri);
   }

  listen(eventName: string){
    return new Observable((subscriber) =>{
      this.socket.on(eventName,(data)=>{
        subscriber.next(data);
      });
    });
  }

  emit(eventName: string , data: any) {
    this.socket.emit(eventName, data);
  }

}
