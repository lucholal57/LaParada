import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// importamos modulo de search pipe
import { Ng2SearchPipeModule } from 'ng2-search-filter';
// importamos modulo HttpClient
import { HttpClientModule } from '@angular/common/http';

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
import { HistorialVentasComponent } from './component/historial-ventas/historial-ventas.component';
import { HistorialVentasCcComponent } from './component/historial-ventas-cc/historial-ventas-cc.component';
import { ClienteComponent } from './component/cliente/cliente.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AutoFocusDirective } from './directiva/AutoFocus.directive';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ProductoComponent,
    VentaComponent,
    HistorialVentasComponent,
    HistorialVentasCcComponent,
    CajaComponent,
    ClienteComponent,
    LoginComponent,
    AutoFocusDirective

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
    HttpClientModule,
    NgMultiSelectDropDownModule.forRoot(),

],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
