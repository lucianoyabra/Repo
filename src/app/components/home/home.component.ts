import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { resolve } from 'url';
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [ UserService ]
})
export class HomeComponent implements OnInit {

  public titulo: string;
  public user: User;
  public identity;
  public token;
  public alertMessage;
  public fileToUpload: Array<File>;
  public url: string;


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
        this.titulo = 'HOME';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.user = this.identity;
    this.url = GLOBAL.url;

   }

  ngOnInit() {
    console.log('home.component.ts cargado');
  }

}
