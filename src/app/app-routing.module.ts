
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Import user add
import {HomeComponent} from './components/home/home.component';


//Import User
import {UserEditComponent} from './components/user-edit/user-edit.component';

//Import user add
import {UserAddComponent} from './components/user-add/user-add.component';

//Import Home
import {ReserveAddComponent} from './components/reserve-add/reserve-add.component';

//Import Home
import {ReserveDetailComponent} from './components/reserve-detail/reserve-detail.component';

//import Salon
import { SalonAddComponent } from './components/salon-add/salon-add.component';
//import Salon
import { SalonDetailComponent } from './components/salon-detail/salon-detail.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'crear-reserva', component: ReserveAddComponent},
  {path: 'ver-reservas', component: ReserveDetailComponent},
  {path: 'https://peaceful-springs-20903.herokuapp.com/ver-reservas', component: ReserveDetailComponent},
  {path: 'crear-usuario', component: UserAddComponent},
  {path: 'mis-datos', component: UserEditComponent},
  {path: 'crear-salon', component: SalonAddComponent},
  {path: 'ver-salon/:id?', component: SalonDetailComponent},
  {path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

