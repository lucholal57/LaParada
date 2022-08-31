import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularMaterialModule} from '../app/angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductoComponent } from './component/producto/producto.component';
import { InicioComponent } from './component/inicio/inicio.component';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ProductoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
