import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Router, ActivatedRoute } from '@angular/router';
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
  selector: 'app-salon-add',
  templateUrl: './salon-add.component.html',
  styleUrls: ['./salon-add.component.css'],
  providers:[ UserService, TableService, SalonService ]
})
export class SalonAddComponent implements OnInit {
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
  }



  borrarMesa(table){

    this._tableService.deleteTable(this.token, table).subscribe(
      response => {
        if (!response['message']){
          if(!response['table']){
            this.alertMessage = 'Error en la consulta';
          }else{
            var i;
            for( i = 0; i < this.tables.length; i++){
              if (this.tables[i]._id === response['table']._id) {
                this.tables.splice(i, 1);
              }
           }
          }
        }else{
          this.alertMessage = response['message'];
          }

      }, error => {
        var errorMensaje = <any>error;
        if(errorMensaje != null){
            var body = JSON.parse(error._body);
            this.alertMessage = body.message;
            console.log(error);
          }
      });

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


  guardar(){
    this.tables.forEach(element => {
      element.salon = this.salon._id;
      alert(element._id);
      this._tableService.editTable(this.token, element._id, element).subscribe(
        response => {
          alert('por ahora todo ok')
          if (response['table'] != undefined){
            console.log(element);
          }else{
            alert('dio response pero error');
            this.alertMessage = 'Error en la petición de mesas';
          }
        }, error => {
          alert('directamente error');
          this.alertMessage = 'Error en la petición de mesas, ha vuelto con error';
        }
      );
    });




    console.log(this.tables);
    alert('va a navegar post actualizacion de mesas');
    // this._router.navigate(['/ver-salon', this.salon._id]);

    /*
    this.salon.description  = document.getElementById('contentSalon').innerHTML;
    this._salonService.(this.token, this.salon).subscribe(
      response =>{
        alert('Guardó el salon, y volvió con response');
        console.log(response);
        alert('response[salon]: ' + response['salon']);
        if (response['salon'] === undefined) {
            this.alertMessage = 'Error en la petición para guardar salon';
          } else {
            alert('listo, va a editar las mesas con el id de salon');
            alert('el id del salon es ' + response['salon']._id);
            this.salon._id = response['salon']._id;
            this.salon.description = response['salon'].description;
            alert('va a navegar con id:' + response['salon']._id);
            alert('va a navegar con id:' + this.salon._id);
            this._router.navigate(['/ver-salon', response['salon']._id]);
          }
      }, error => {
          alert('Guardó el salon, y volvió con error');
          var errorMensaje = <any>error;
          if(errorMensaje != null){
            var body = JSON.parse(error._body);
            this.alertMessage = body.message;
            console.log(error);
          }
      }
    );

    /*/
  }

  agregar(){
    var table = new Table('','','','','','','');
    table.capacity = this.tableSelected.capacity;
    table.description = this.tableSelected.description;
    table.positionX = null;
    table.positionY = null;
    table.salon = null;
    table.number = (this.tables.length + 1).toString();
    console.log(this.table);

    this._tableService.addTable(this.token, table).subscribe(
      response => {
        alert('ya envió el addtabla y volvio con response');
        if (!response['message']){
          if(!response['table']){
            this.alertMessage = 'Error en el servidor' ;
            //this._router.navigate(['/']);
          }else{
            if(response['table'] != undefined ){
              this.table._id = response['table']._id;
              alert(this.table._id);
              console.log(table);
            }else{
              this.alertMessage = response['message'];
            }
          }
        }else{
          this.alertMessage = response['message'];
          }
      }, error =>{
        alert('ya envió el addtabla y volvio con error');
        var errorMensaje = <any>error;
        if(errorMensaje != null){
          var body = JSON.parse(error._body);
          this.alertMessage = body.message;
          console.log(error);
        }
      }
    );

    this.tables.push(table);
    this.tablesCount.push(this.tablesCount.length);
    this.tableSelected = new Table('','','','','','','');

  }

  nuevo(){

    if(confirm('Está seguro?')){
      this.tables = [];
      this.nuevoSalon = true;
      this._tableService.deleteTable(this.token,null).subscribe( // Borro todas las mesas
        response => {
          if (response['table'] === undefined){
            this.alertMessage = 'Error en el servidor';
          }
        }, error => {
          var errorMensaje = <any>error;
          if(errorMensaje != null){
          var body = JSON.parse(error._body);
          this.alertMessage = body.message;
          console.log(error);
        }
        }
      );

      this.salon.date = new Date(Date.now());
      this.salon.description = ''; // document.getElementById('contentSalon').innerHTML;

      this._salonService.addSalon(this.token, this.salon).subscribe(
        response => {
          if ( response['salon'] != null || response['salon'] != undefined || response['salon'] != '' )
          {
            this.salon = response['salon'];
            console.log('aca va el nuevo salon creado');
            console.log(response['salon']);
            console.log(this.salon);
          }
        }, error => {
          this.alertMessage = 'Hubo un error al crear el nuevo salon';
        }
      );


    }
  }

  mapearTabla(event){
    console.log(event);
    var path = event.composedPath();
    console.log('nro de mesa:' + path[0].innerText);//Todas las mesas
    /*
    var i;

    for(i=0;i<this.tables.length;i++){
      if(this.tables[i].number === path[0].innerText){
        this.tables[i].positionX = event.clientX;
        this.tables[i].positionY = event.clientY;
      }
    }
*/
    console.log( path[1].innerHTML);//contenido html
    console.log(event.clientX);
    console.log(event.clientY);

    var index = parseInt(path[0].innerText);
    console.log( this.tables[ index - 1 ]);
    this.table = this.tables[ index - 1 ];


  }


}
