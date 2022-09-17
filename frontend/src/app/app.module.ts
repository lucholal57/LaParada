import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// importamos modulo de search pipe
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { AngularMaterialModule} from '../app/angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductoComponent } from './component/producto/producto.component';
import { InicioComponent } from './component/inicio/inicio.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { VentaComponent } from './component/venta/venta.component';
import { LoginComponent } from './component/login/login.component';
import { CajaComponent } from './component/caja/caja.component';



@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ProductoComponent,
    VentaComponent,
    CajaComponent,
    LoginComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    NgbModule,
    Ng2SearchPipeModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
