import { Producto } from "../producto/producto";

export class Venta {
    id=0;
    forma_pago="";
    fecha=new Date();
    total=0;
    producto: Producto[]=[];
}
