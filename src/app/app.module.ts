import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserAddComponent } from './components/user-add/user-add.component';
import { ReserveAddComponent } from './components/reserve-add/reserve-add.component';
import { ReserveDetailComponent } from './components/reserve-detail/reserve-detail.component';
import { HomeComponent } from './components/home/home.component';
import { EventAddComponent } from './components/event-add/event-add.component';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SalonAddComponent } from './components/salon-add/salon-add.component';
import { SalonDetailComponent } from './components/salon-detail/salon-detail.component';
import { MessageService } from './services/message.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    UserEditComponent,
    UserAddComponent,
    ReserveAddComponent,
    ReserveDetailComponent,
    HomeComponent,
    EventAddComponent,
    SalonAddComponent,
    SalonDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    DragDropModule
  ],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}, MessageService, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
