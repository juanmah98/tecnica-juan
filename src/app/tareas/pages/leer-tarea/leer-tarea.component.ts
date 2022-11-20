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
    this.getTareas();   
  }

 async getTareas(){
  await this.tareasServices.getTareas().subscribe({
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
      
    })

    setTimeout(() =>{
    this.auxiliar = this.tareas.filter(x => x.email == sessionStorage.getItem("email") as string)
    console.log(this.auxiliar);
    },500);
    
    
  }

  
 

}
