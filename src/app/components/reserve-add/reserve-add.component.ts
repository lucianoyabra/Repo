import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event';
import { Reserve } from '../../models/reserve';
import { GLOBAL } from '../../services/global';
import { ReserveService } from '../../services/reserve.service';
import { WebsocketService } from '../../socket/websocket.service';
import { ReserveDetailComponent } from '../reserve-detail/reserve-detail.component';
import { MessageService } from 'app/services/message.service';

@Component({
  selector: 'app-reserve-add',
  templateUrl: '../reserve-add/reserve-add.component.html',
  providers: [UserService,ReserveService,EventService, WebsocketService]
})
export class ReserveAddComponent implements OnInit {
  public titulo: string;
  public identity;
  public token;
  public url:string;
  public alertMessage:string;
  public isEdit ;
  public filesToUpload:Array<File>;
  public event: Event;
  public reserve: Reserve;
  public reserveDetail:ReserveDetailComponent;


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _reserveService: ReserveService,
    private _eventService: EventService,
    private _webSocketService: WebsocketService,
    private _messageService: MessageService){
      this.titulo = "Agregar Reserva";
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
      this.url = GLOBAL.url;
      this.reserve = new Reserve('','','',null,'',null);

   }

  ngOnInit() {
    console.log('reserve-add.component.ts cargado');
    //this.getAlbum();
  }

  getReserve(){
    this._route.params.forEach((params:Params)=>{
      let id = params['reserve'];
      //this.album.artist = id;
      this._reserveService.getReserve(this.token, id).subscribe(
        response =>{
          if (!response['message']){
            if(!response['reserve']){
              this.alertMessage = 'Error en el servidor' ;
              this._router.navigate(['/']);
            }else{
              this.reserve = response['reserve'];
            }
          }else{
            this.alertMessage = response['message'];
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
    console.log(this.reserve);

  }

  public reserveForm(form) {
    this._messageService.sendMessageJet(form, "reserve").subscribe(
      response => {
        if (response['message'] != undefined || response['message'] != null ) {
          if (response['message'] == "ok") {

          }
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
  onSubmit(form){

    this._route.params.forEach((params:Params)=>{
      //let album_id = params['album'];
      //this.song.album = album_id;
      this._reserveService.addReserve(this.reserve).subscribe(
        response=>{
          if (!response['message']){
            if(!response['reserve']){
              this.alertMessage = 'Error en el servidor' ;
            }else{
              this.alertMessage = 'Reserva agregada satisfactoriamente';
              this.reserve = new Reserve('','','',null,'',null);
              this._webSocketService.emit('new reserve', response['reserve']);
              this.reserveForm(form);

            }
          }else{
            this.reserve = response['reserve'];
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
    console.log(this.reserve);

  }

  fileSaveEvent(fileInput:any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
}

