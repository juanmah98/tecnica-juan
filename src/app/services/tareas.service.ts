import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tareas } from '../interfaces/tareas';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

 /*  baseURL: string ='https://thedevarg.pythonanywhere.com/users/getusers'; */
  baseURL: string ='https://gorest.co.in/public/v2/posts/1/comments';
  appKey: string = 'a3519a854f32e317e95df9d191cf73e9235aa448c46cce57b544eccb38249669';

  constructor(private http: HttpClient) { }

 /*  getTareas(): Observable<Tareas>{   
    return this.http.get<Tareas>(this.baseURL)    
  } */

  getTareas(): Observable<Tareas>{

    
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.appKey);
    return this.http.get<Tareas>(this.baseURL , {headers})    
    
     
    
  }

  postAnser(tarea:Tareas): Observable<any>{   
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.appKey);
    const body=JSON.stringify(tarea);
    console.log(body);
    return this.http.post(this.baseURL,tarea,{headers})
  }
}
