import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { deleteDoc } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { Tareas } from '../interfaces/tareas';


@Injectable({
  providedIn: 'root'
})
export class TareasService {

  baseURL: string ='https://gorest.co.in/public/v2/posts/1/comments';
  appKey: string = 'a3519a854f32e317e95df9d191cf73e9235aa448c46cce57b544eccb38249669';

  constructor(private http: HttpClient, private firestore: Firestore) { }

/* IMPLEMENTACION DE REQUEST CON API REST,
  LA MISMA ES UNA API FREE QUE TIENE LIMITE DE LLAMADOS GET, POST, PUT Y DELETE.
  DEJO EL CODIGO DE FUNCIONAMIENTO, PROBE LAS REQUEST Y FUNCIONAN BIEN PERO TIENE FALLOS AL SER API FREE.
*/

/* REQUEST PARA API */
  getTareas(): Observable<Tareas>{    
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.appKey);
    return this.http.get<Tareas>(this.baseURL , {headers})        
  }

  postTarea(tarea:Tareas): Observable<Tareas>{   
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.appKey);
    const body=JSON.stringify(tarea);
    console.log(body);
    return this.http.post<Tareas>(this.baseURL,tarea,{headers: headers})
  }

  putTarea(tarea:Tareas):Observable<Tareas>{
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.appKey);
    const body=JSON.stringify(tarea);
    console.log(body);
    return this.http.put<Tareas>(this.baseURL, body, { headers: headers })  
  }

  BookDelete (tarea:Tareas):Observable<Tareas>{
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.appKey);
    const body=JSON.stringify(tarea);
    
    console.log(body);
    return this.http.delete<Tareas>(this.baseURL+"/"+tarea.id + { headers: headers });
  }

/* REQUEST CON FIRESTORE*/
 postTareaCloud(pedido: Tareas,id:string){
  const pedidoRef = collection(this.firestore, `user/${id}/tarea`);
  return addDoc(pedidoRef, pedido);
} 

getTareasCloud(id: string): Observable<Tareas[]>{
  const pedidoRef = collection(this.firestore, `user/${id}/tarea`);
  return collectionData(pedidoRef, {idField: 'id'})  as Observable<Tareas[]>;
}

deleteTareaCloud(pedido: Tareas, id: string){
  const pedidoDocRef = doc(this.firestore,`user/${id}/tarea/${pedido.id}`);
  return deleteDoc(pedidoDocRef);
}

putTareaCloud(pedido: Tareas, id:string) {
  console.log("id Service: "+pedido.id)
  const pokemonDocumentReference = doc(
    this.firestore,
    `user/${id}/tarea/${pedido.id}`      
  );
  return updateDoc(pokemonDocumentReference, { ...pedido });
}


}
