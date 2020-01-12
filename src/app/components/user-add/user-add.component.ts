import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { resolve } from 'url';
import { GLOBAL } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  providers: [UserService]

})
export class UserAddComponent implements OnInit {
  public title = 'Empresa';
  public user: User;
  public userLogIn: User;
  public user_register: User;
  public identity;
  public token;
  public errorMessage;
  public alertMessage;
  public url:string;
  public mostrarWeb = false;

  constructor(private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router)
    {
      this.user_register =  new User('','','','','','','');
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
      this.user = this.identity;
      this.url = GLOBAL.url;
  }

  ngOnInit(){

    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    console.log(this.identity);
    console.log(this.token);
    this.title = 'Crear usuario nuevo';
  }


  onSubmitRegister(){
    console.log(this.user_register);
    this.user_register.role = 'ROLE_' + this.user_register.role;
    this._userService.register(this.user_register).subscribe(
      response => {
        let user = response['user'];
        this.user_register = user;
        let message = response['message'];

        if (!message){
          if(!user._id){
            this.alertMessage = 'Error al registrarse';
          }else{
            this.alertMessage = 'El registro se ha realizado correctamente, identificate con '+ this.user_register.email;
            this.user_register = new User('','','','','','ROLE_USER','');
          }
        }else{
          this.alertMessage = message;
        }

    }, error =>{
      var errorMensaje = <any>error;
      if(errorMensaje != null){
        var body = JSON.parse(error._body);
        this.alertMessage = body.message;
        console.log(error);
      }
    }
    );
  }



}
