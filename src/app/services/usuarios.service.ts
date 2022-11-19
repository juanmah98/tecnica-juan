import { Injectable } from '@angular/core';
import { Firestore, addDoc, collectionData, doc, deleteDoc, updateDoc, docSnapshots, onSnapshot, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Registro } from '../interfaces/registro';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private firestore: Firestore) { }

  addUser(clave: Registro){    
    const claveRef = collection(this.firestore, `user`);
    return addDoc(claveRef, clave);
  }

  getUsers(): Observable<Registro[]>{
    const pedidoRef = collection(this.firestore, `user`);
    return collectionData(pedidoRef, {idField: 'id'})  as Observable<Registro[]>;
  }

  deleteUser(clave: Registro){
    const pedidoDocRef = doc(this.firestore,`user/${clave.id}`);
    return deleteDoc(pedidoDocRef);
  }

}
