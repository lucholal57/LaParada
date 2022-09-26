import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CajaComponent } from './component/caja/caja.component';
import { HistorialVentasComponent } from './component/historial-ventas/historial-ventas.component';
import { InicioComponent } from './component/inicio/inicio.component';
import { LoginComponent } from './component/login/login.component';
import { ProductoComponent } from './component/producto/producto.component';
import { VentaComponent } from './component/venta/venta.component';

const routes: Routes = [
  {path:'inicio',component: InicioComponent},
  {path:'producto',component: ProductoComponent},
  {path:'venta', component: VentaComponent},
  {path:'venta/historial', component: HistorialVentasComponent},
  {path:'caja',component: CajaComponent},
  {path:'login',component: LoginComponent},
  {path:'',component: LoginComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
