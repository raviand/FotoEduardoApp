import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/providers/firebase.service';
import { User } from 'src/app/classes/usuarios.class';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, NgForm } from '@angular/forms';
import { Registro, Pago } from 'src/app/classes/registro.class';



@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styles: [],
  providers: [NgbModalConfig, NgbModal]
})
export class EditComponent implements OnInit {
  user:User;
  date:FormControl;
  registro:Registro;
  pago:Pago;
  constructor(public fsService:FirebaseService,
                      config: NgbModalConfig, 
              private modalService: NgbModal) {
    this.fsService.getUser(1557540102635).subscribe(u=> this.user = u.pop());
    config.backdrop = 'static';
    config.keyboard = false;

    this.date = new FormControl(new Date());
   

    this.registro = {
      fecha : new Date().getTime(),
      detalle : '',
      importe : 0,
    }

    
   }

  ngOnInit() {
  }

  /**
   * carga registro de articulos
   */
  cargarRegistro(){
    this.registro.fecha = this.date.value.getTime();
    console.log(this.registro);
    this.user.registros.push(this.registro);
    this.registro = {
      fecha : new Date().getTime(),
      detalle : '',
      importe : 0,
    }  
  }


  /**
 * Carga pagos efectuados
 */
  cargarPago(){

  }

  modificarReg(){

  }

  eliminarReg(){

  }

}
