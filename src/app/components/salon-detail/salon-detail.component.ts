import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SalonService } from '../../services/salon.service';
import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global';
import { TableService } from '../../services/table.service';
import { NgModel } from '@angular/forms';
import { Salon } from '../../models/salon';
import { Table } from '../../models/table';
import { ViewChild, ElementRef } from '@angular/core';
import { CdkDragEnd } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-salon-detail',
  templateUrl: './salon-detail.component.html',
  providers:[ UserService, TableService, SalonService ]
})
export class SalonDetailComponent implements OnInit {
  public title = 'Empresa';
  public user: User;
  public identity;
  public token;
  public errorMessage;
  public alertMessage;
  public url:string;
  public mostrarWeb = false;
  public tables:Table[] = [];
  public tablesCount = [];
  public tableSelected:Table;
  public table:Table;
  public nuevoSalon = false;
  public salon: Salon;
  public idSalon = '';

  constructor(
    private _userService: UserService,
    private _tableService: TableService,
    private _salonService: SalonService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.user = this.identity;
    this.url = GLOBAL.url;
    this.table = new Table('', '', '', '', '', '', '');
    this.tableSelected = new Table('', '', '', '', '', '', '');
    this.salon = new Salon('', null, '');
   }

  ngOnInit() {
    this.idSalon = this._route.snapshot.params['id'];
    alert(this.idSalon);
    if (this.idSalon != '' && this.idSalon != '1' && this.idSalon != undefined ){
      this.getTables();
      this.updateTables(this.idSalon);
    }else{
      this.getTables();
      if (this.tables.length > 0){
        this.idSalon = this.tables[1].salon.toString();
      }
      if (this.idSalon != ''){
        this.updateTables(this.idSalon);
      }
    }

  }

  getTables(){

    this._tableService.getTables(this.token, null).subscribe(
      response => {
        if (response['tables'] != undefined){
          this.tables = response['tables'];
          console.log(this.tables);
          alert('Salon id = ' + response['tables'][0].salon._id);
          if (this.tables.length > 0){
            this.idSalon = response['tables'][0].salon._id;
            this.fillSalon(this.idSalon);
          }
        }else{
          this.alertMessage = 'Error en la petición de mesas';
        }
      }, error => {
        this.alertMessage = 'Error en la petición de mesas, ha vuelto con error';
      }
    );
  }

  fillSalon(id){
    alert('desde fill salon :' + id);
    this._salonService.getSalones(this.token, id ).subscribe(
      response => {
        alert(response['salones']);
        if (response['salones'] != undefined){
          this.salon = response['salones'];
          console.log(response['salones']);
          this.cargarSalon(response['salones'].description);
        }
      }, error => {
        this.alertMessage = error;
        console.log(error);
      }
    );

  }

  cargarSalon(html){
    alert('html : ' + html)
    let content = document.getElementById('contentSalon');
    let nuevo = document.createElement('div');
    alert(content);
    nuevo.innerHTML = html;
    alert('va a cargar nuevo div con texto = ' + nuevo.innerHTML);
    content.append(nuevo);
  }

  updateTables(id){
    this.tables.forEach(element => {
      element.salon = id;
      alert(element._id);
      this._tableService.editTable(this.token, element._id, element).subscribe(
        response => {
          alert('por ahora todo ok')
          if (response['table'] != undefined){
            console.log(element);
          }else{
            alert('dio response pero error')
            this.alertMessage = 'Error en la petición de mesas';
          }
        }, error => {
          alert('directamente error')
          this.alertMessage = 'Error en la petición de mesas, ha vuelto con error';
        }
      );
    });
  }

}
