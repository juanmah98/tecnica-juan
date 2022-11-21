import { Component, OnInit } from '@angular/core';
import { Tareas } from 'src/app/interfaces/tareas';
import { TareasService } from 'src/app/services/tareas.service';

@Component({
  selector: 'app-leer-tarea',
  templateUrl: './leer-tarea.component.html',
  styleUrls: ['./leer-tarea.component.css']
})
export class LeerTareaComponent implements OnInit {

  constructor(private tareasServices: TareasService) { }
  tareas:Tareas[] = [];
  auxiliar:Tareas[]=[];

  ngOnInit(): void {   
   /* setTimeout(() => {
     this.getTareas()   ;
    },500) 
 */
   
     
      setTimeout(() => {
        this.getTareas();
      },500)
   

  }

 async getTareas(){

  /* await this.tareasServices.getTareas().subscribe({
      next: (data: any) => {
        console.log("Response");
        console.log(data);
        this.tareas=data;
      },
      error: (err:any) => {
        console.log('Error de peticion');
        console.log(err);
      },
      complete: () => {
        console.log('La peticion termino')
      }
      
    }) */



    /* setTimeout(() =>{
    this.auxiliar = this.tareas.filter(x => x.email == sessionStorage.getItem("email") as string)
    console.log(this.auxiliar);
    },500); */ 
    console.log("GET TAREAS")
    console.log(sessionStorage.getItem("idUser"));
    console.log(this.tareas)

   await this.tareasServices.getTareasCloud(sessionStorage.getItem("idUser") as string).subscribe(prod => {  
      this.tareas = prod;
      sessionStorage.setItem("length", String(prod.length));          
      console.log(prod);
  
    });
  
    
  }

  tareaLista(tarea: Tareas){

    tarea.lista = true;
    this.tareasServices.putTareaCloud(tarea, sessionStorage.getItem("idUser") as string);

  }

  eliminarTarea(tarea: Tareas){

    tarea.lista = true;
    this.tareasServices.deleteTareaCloud(tarea, sessionStorage.getItem("idUser") as string);

  }

  
 

}
