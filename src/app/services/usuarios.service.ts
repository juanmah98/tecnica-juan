import { Injectable } from '@angular/core';
import { Firestore, addDoc, collectionData, doc, deleteDoc, updateDoc, docSnapshots, onSnapshot, collection } from '@angular/fire/firestore';
import { Login } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private firestore: Firestore) { }

  addUser(clave: Login){    
    const claveRef = collection(this.firestore, `user`);
    return addDoc(claveRef, clave);
  }

}
