import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../classes/usuarios.class';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  usuarios: Observable<User[]>;
  public usuario:User;
  public users:User[];
  public userCollection:AngularFirestoreCollection<User>;


  constructor(public db: AngularFirestore, public afAuth:AngularFireAuth) {
    this.usuarios = <Observable<User[]>> db.collection('usuarios').valueChanges();
  
    console.log('usuarios registrados: ',this.usuarios.forEach(u => console.log(u)))

    this.afAuth.authState.subscribe(user=>{
      console.log('estado del usuario: ', user)
      if(!user){
        return;
      }

      this.usuario.name = user.displayName
      this.usuario.uid = user.uid
    })

    
    this.userCollection = this.db.collection<User>('usuarios', ref => console.log(ref))
    this.usuario = {
      name:'',
      fechaCreacion: new Date().getTime(),
      mail:'',
      pagos:[],
      registros:[],
      sync:false
    }
  }

  setNewUser(user:User){
    //TODO: ver uid faltante
    this.usuario.name = user.name;
    this.usuario.mail = user.mail;
    if(user.phone){
      this.usuario.phone = user.phone;
    }

    return this.userCollection.add(this.usuario);
  }

  loadUsers(){

    this.userCollection = this.db.collection<User>('usuarios', ref => ref);

    return this.userCollection.valueChanges().pipe( map(  (usuario:User[]) => this.users = usuario ));
  }

  getUser(creationDate:number){
    this.userCollection = this.db.collection<User>('usuarios', ref => ref.where('fechaCreacion', '==', creationDate));

    return this.userCollection.valueChanges().pipe( map(  (usuario:User[]) => this.users = usuario ));
  }

}
