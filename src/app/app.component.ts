import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { User } from './models/user';
import { GLOBAL } from './services/global';
import { Router, ActivatedRoute, Params, NavigationStart, NavigationEnd } from '@angular/router';
import { WebsocketService } from './socket/websocket.service';
import { MessageService } from './services/message.service';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Reserve } from './models/reserve';
import { ReserveService } from './services/reserve.service';
import { EventService } from './services/event.service';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Location } from '@angular/common';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

export let browserRefresh = false;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [UserService, MessageService, ReserveService, EventService]

})
export class AppComponent implements OnInit {
  public title = 'resto';
  public user: User;
  public userLogIn: User;
  public user_register: User;
  public identity;
  public token;
  public errorMessage;
  public alertMessage:string;
  public alertRegister;
  public url:string;
  public mostrarWeb = false;
  public http: HttpClient;
  public email : string;
  public name : string;
  public message : string;
  public endpoint : string;
  public reserve: Reserve;
  public subscription: Subscription;
  public notifReservas = 0;


  constructor(private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router,
    private webSocketService: WebsocketService,
    private _messageService: MessageService,
    private _reserveService: ReserveService,
    private _eventService: EventService,
    private location: Location)
    {
    this.user =  new User('','','','','','ROLE_USER','');
    this.user_register =  new User('','','','','','ROLE_USER','');
    this.reserve = new Reserve('','','',null,'', null);
    this.url = GLOBAL.url;


    /*this._router.events
    .pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
    .subscribe(event => {
      if (
        event.id === 1 &&
        event.url === event.urlAfterRedirects
      ) {
        alert('fue Refresh');
      }
    })*/
  }

  navigate(url, params) {
    this._router.navigateByUrl( url , {skipLocationChange: true});
    this.location.replaceState('');
  }

  ngOnInit(){
    console.log('entro al oninit de app.component');
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    console.log(this.identity);
    console.log(this.token);
    this.url = GLOBAL.url;
    this.reserve = new Reserve('','','',null,'',null);

    if(this.token){
      document.getElementById('web').setAttribute('style', 'display:none');
      document.getElementById('mu-header-footer').setAttribute('style', 'display:block');
      // document.getElementById('mu-header-header').setAttribute('style', 'display:block');
      // document.getElementById('mu-header').setAttribute('style', 'display:none');

      this.mostrarWeb = true;
    }

    //LISTEN WEBSOCKET EVENT

    this.webSocketService.listen('new reserve found').subscribe((data) => {
      this.notifReservas = Number(this.notifReservas) + 1;
      document.getElementById('notif-reserves').innerText = Number(this.notifReservas).toString();
      document.getElementById('notif-reserves').setAttribute('style', 'display:block');
    });

    this.webSocketService.listen('message').subscribe((data) => {
      console.log(data);
    });
   }

  public close() {
    document.getElementById('boton-collapse').click();
  }

  public clearNotif(){
    this.notifReservas = 0;
    document.getElementById('notif-reserves').innerText = '';
    document.getElementById('notif-reserves').setAttribute('style', 'display:none');
  }

  public cargo(){
    //document.getElementById('notif-reserves').innerText = '';
    //document.getElementById('notif-reserves').setAttribute('style', 'display:none');
  }

  public contactForm(form) {
    this._messageService.sendMessageJet(form, "contact" ).subscribe(
      response => {
        if (response['message'] != undefined || response['message'] != null ) {
          if (response['message'] == "ok") {
            alert('todo bien');
          }else {
            alert('todo mal');
          }
        }
      } , error => {

      });

  }

  public reserveForm(form) {
    this._messageService.sendMessageJet(form, "reserve").subscribe(
      response => {
        if (response['message'] != undefined || response['message'] != null ) {
          if (response['message'] == "ok") {
            this.agregarReserva();
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

  public agregarReserva(){
    this._route.params.forEach((params:Params)=>{
      //let album_id = params['album'];
      //this.song.album = album_id;
      this._reserveService.addReserve(this.reserve).subscribe(
        res => {
          console.log('ok');

          if (res['message'] != undefined || res['message'] != null){
            if(res['reserve'] != undefined || res['reserve'] != null){
              this.alertMessage = 'Error en el servidor' ;
            }else{
              this.alertMessage = 'Reserva agregada satisfactoriamente';
              this.reserve = new Reserve('','','',null,'',null);
              this.webSocketService.emit('new reserve', res['reserve']);

            }
          }else{
            this.reserve = res['reserve'];
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

  public mostrarOcultar() {

    if (this.mostrarWeb == false) {
      document.getElementById('web').setAttribute('style', 'display:none' );
      document.getElementById('mu-header-footer').setAttribute('style', 'display:block');
     // document.getElementById('mu-header-header').setAttribute('style', 'display:block');
      this.mostrarWeb = true;
    } else {
      document.getElementById('web').setAttribute('style','display:block');
      document.getElementById('mu-header-footer').setAttribute('style','display:none');
     // document.getElementById('mu-header-header').setAttribute('style', 'display:none');
      this.mostrarWeb = false;
    }
  }

  public onSubmit3(){
    this._userService.try().subscribe(
      response => {
        let identity = response;
        console.log(identity);

      },error =>{
        console.log('error');
      });
  }

  public onSubmit(){

    this._userService.signUp(this.user).subscribe(
      response => {
        let identity = response['user'];
        this.identity = identity;

        if(!this.identity._id){
          alert('El usuario no ha sido correctamente identificado');
        }else{
          //CREAR ELEMENTO EN EL LOCAL STORAGE PARA TENER AL USUARIO EN SESION
          localStorage.setItem('identity', JSON.stringify(identity));
           //CREAR ELEMENTO EN EL LOCAL STORAGE PARA TENER AL USUARIO EN SESION
           this._userService.signUp(this.user, 'true').subscribe(
            response => {
              let token = response['token'];
              this.token = token;
              this.user_register = new User('','','','','','ROLE_USER','');

              if(this.token.lenght <= 0){
                alert('El token no se ha generado');
              }else{
                  //CREAR ELEMENTO EN EL LOCAL STORAGE PARA TENER AL token disponible
                  localStorage.setItem('token', token);
                  window.location.reload();


                  //document.getElementById('web').setAttribute('style','display:none');
                  //window.location.reload();
                  //console.log(token);
                  //console.log(identity);

              }

          }, error =>{
            var errorMensaje = <any>error;
            if(errorMensaje != null){
              var body = JSON.parse(error._body);
              this.errorMessage = body.message;
              console.log(error);
            }
          });

        }

    }, error =>{
      var errorMensaje = <any>error;
      if(errorMensaje != null){
        var body = JSON.parse(error._body);
        this.errorMessage = body.message;
        console.log(error);
      }
    });
  }

  logOut(){
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    localStorage.clear();
    this.identity = null;
    this.token = null;
    this._router.navigate(['/']);
    window.location.reload();
  }

}
