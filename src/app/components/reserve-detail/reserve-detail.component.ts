import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import { UserService } from '../../services/user.service';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event';
import { Reserve } from '../../models/reserve';
import { GLOBAL } from '../../services/global';
import { ReserveService } from '../../services/reserve.service';
import { WebsocketService } from '../../socket/websocket.service';
import * as io from 'socket.io-client';
import { Observable, BehaviorSubject, Subscriber } from 'rxjs';
import { filter } from 'rxjs/operators';
import {AppComponent} from '../../app.component';

@Component({
  selector: 'app-reserve-detail',
  templateUrl: '../reserve-detail/reserve-detail.component.html',
  providers: [UserService,ReserveService,EventService,WebsocketService]
})
export class ReserveDetailComponent implements OnInit {
  public titulo: string;
  public identity;
  public token;
  public url:string;
  public alertMessage:string;
  public isEdit ;
  public filesToUpload:Array<File>;
  public event: Event;
  public reserves: Reserve[];
  public socket: SocketIOClient.Socket;
  public prevDay: Date;
  public nextDay: Date;
  public actualDay: Date;
  public showDay: String;
  @Output() carga = new EventEmitter<string>();


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _reserveService: ReserveService,
    private _eventService: EventService,
    private _webSocketService: WebsocketService){
      this.titulo = 'Reservas del día';
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
      this.url = GLOBAL.url;

   }

  ngOnInit() {
    // window.location.replace('https://peaceful-springs-20903.herokuapp.com/');
    this._webSocketService.listen('new reserve found').subscribe((data) => {
      this.getReserves();
    });

    console.log('reserve-add.component.ts cargado');
     /*this.socket.on('new reserve found', (data: any) =>
    {
       this.getReserves();
     });
     */
    this.getReserves();
    // ((new Date(Date.now()).getUTCFullYear().toString() + '-' + (new Date(Date.now()).getUTCMonth() +1) + '-'+ new Date(Date.now()).getUTCDate() + 'T00:00:00.000Z').toString())
    this.actualDay = (new Date());
    this.showDay = this.actualDay.toLocaleDateString();
    this.nextDay = new Date(this.actualDay);
    this.nextDay.setDate(this.nextDay.getDate() + 1);
    this.prevDay = new Date(this.actualDay);
    this.prevDay.setDate(this.prevDay.getDate() + 1);

  }

  changePage(delta: number): void {
        //&this.actualDay = new Date();
        this.actualDay.setDate(this.actualDay.getDate() + delta);
        this.showDay = this.actualDay.toLocaleDateString();
        //this.actualDay = (new Date());
        this.nextDay = new Date(this.actualDay);
        this.nextDay.setDate(this.nextDay.getDate() + 1);
        this.prevDay = new Date(this.actualDay);
        this.prevDay.setDate(this.prevDay.getDate() + 1);
        this.getReservesDate();
    }

    getReservesDate(){
        // tslint:disable-next-line: max-line-length
        const searchDate = ((new Date(this.actualDay).getUTCFullYear().toString() + '-' + (new Date(this.actualDay).getUTCMonth() +1) + '-'+ new Date(this.actualDay).getUTCDate() + 'T00:00:00.000Z').toString());
        // tslint:disable-next-line: max-line-length
        // alert(searchDate); // ((new Date(Date.now()).getUTCFullYear().toString() + '-' + (new Date(Date.now()).getUTCMonth() +1) + '-'+ new Date(Date.now()).getUTCDate() + 'T00:00:00.000Z').toString())
        this._reserveService.getReservesDate(this.token, this.actualDay).subscribe(
          response => {
            if (!response['reserves']) {
              this.alertMessage = 'Error en el servidor' ;
              // this._router.navigate(['/']);
            } else {
              this.reserves = response['reserves'];
              console.log(this.reserves);
            }


          },
          error =>{
            var errorMensaje = <any>error;
            if(errorMensaje != null){
              var body = JSON.parse(error._body);
              this.alertMessage = body.message;
              console.log(error);
            }
          }
        );

    }


  getReserves(){
    this._route.params.forEach((params:Params)=>{
      let id = params['reserve'];
      //this.album.artist = id;
      this._reserveService.getReserves(this.token).subscribe(
        response=>{
          if(!response['reserves']){
            this.alertMessage = 'Error en el servidor' ;
            //this._router.navigate(['/']);
          }else{
            this.reserves = response['reserves'];
            console.log(this.reserves);
          }


        },
        error =>{
          var errorMensaje = <any>error;
          if(errorMensaje != null){
            var body = JSON.parse(error._body);
            this.alertMessage = body.message;
            console.log(error);
          }
        }
      );
    });

    // this.carga.emit();
  }

  onCancelReserve(){

  }

  fileSaveEvent(fileInput:any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
}


