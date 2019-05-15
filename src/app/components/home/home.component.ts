import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/providers/firebase.service';
import { User } from 'src/app/classes/usuarios.class';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [],
  providers: [NgbModalConfig, NgbModal]
})
export class HomeComponent implements OnInit {
  users:User[]=[];
  user:User;
  constructor(public dbService:FirebaseService,
                      config: NgbModalConfig, 
              private modalService: NgbModal,
              private route:Router) {
    dbService.loadUsers().subscribe();
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
  }

  verDetalle(usuario, user){
    
    this.user = user;
    console.log(this.user)
    this.modalService.open(usuario, {size:'lg'});
    //this.modalService.open(usuario);
  }

  editar(user:User){
    this.route.navigate(['edit', user.fechaCreacion]);
  }

  closeModal(){
    this.modalService.dismissAll();
  }

}
