import { Registro, Pago } from './registro.class';

export class User{
    name:string;
    mail:string;
    phone?:string;
    picUrl?:string;
    registros:Registro[];
    pagos:Pago[];
    fechaCreacion:Number;
    sync:boolean=false;
    uid?:string;
}