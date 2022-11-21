import { Component, Input, OnInit } from '@angular/core';
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

  @Input() idUser = '';

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

   await this.tareasServices.getTareasCloud(this.idUser).subscribe(prod => {  
      this.tareas = prod;
      sessionStorage.setItem("length", String(prod.length));          
      console.log(prod);
  
    });
  
    
  }

  tareaLista(tarea: Tareas){

    tarea.lista = true;
    this.tareasServices.putTareaCloud(tarea, this.idUser);

  }

  eliminarTarea(tarea: Tareas){

    tarea.lista = true;
    this.tareasServices.deleteTareaCloud(tarea, this.idUser);

  }

  
 

}
