import { Producto } from "../producto/producto";

export class Venta {
    id=0;
    forma_pago="";
    fecha=new Date();
    producto: Producto[]=[];
    cliente="";
    direccion="";
    telefono=0;
    total=0;
}
