import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/classes/usuarios.class';
import { FirebaseService } from 'src/app/providers/firebase.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styles: [`
    .ng-invalid.ng-touched:not(form) {
      border: 1px solid red;
    }
  `]
})
export class CreateComponent implements OnInit {

  user:User;
  warning:string;
  constructor(private fdb:FirebaseService) { 
    this.user = {
      name:'',
      fechaCreacion: new Date().getTime(),
      mail:'',
      pagos:[],
      registros:[],
      sync:false
    }
  }

  ngOnInit() {
  }

  post(form : NgForm){
    console.log(form)
    console.log(this.user)
    if(this.user.name === null || this.user.mail === null){
      this.warning = 'Faltan completar campos obligatorios'
      return
    }
    this.warning = null
    this.fdb.setNewUser(this.user)
    .then(()=> this.user = null)
    .catch( () => console.log('Error en el envio de usuario')  );

  }

}
