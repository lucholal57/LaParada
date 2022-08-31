import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './component/inicio/inicio.component';
import { ProductoComponent } from './component/producto/producto.component';

const routes: Routes = [
  {path:'inicio',component: InicioComponent},
  {path:'producto',component: ProductoComponent},
  //Se pone los comodines ** para que a cualquier ruta nos redirija a inicio en este ejemplo
  //phatMatch sirve para la coincidencia sea total en cuanto a lo que escriba
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
