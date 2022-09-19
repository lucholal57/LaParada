import { Producto } from "../producto/producto";

export class Venta {
    id=0;
    forma_pago="";
    fecha=new Date();
    producto: Producto[]=[];
    total="";
}
