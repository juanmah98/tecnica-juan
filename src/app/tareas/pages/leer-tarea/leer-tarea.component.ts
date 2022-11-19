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
  arre:Tareas[] = [];
  arre2:Tareas ={
    id: 0,
    post_id: 0,
    name: '',
    email: '',
    body: ''
  };
  ngOnInit(): void {
    this.getAnswersAll();
    console.log('estamos en el componente answers');
  }

  getAnswersAll(){
    this.tareasServices.getTareas().subscribe({
      next: (data: any) => {
        console.log("Response");
        console.log(data);
        this.arre=data;
      },
      error: (err:any) => {
        console.log('Error de peticion');
        console.log(err);
      },
      complete: () => {
        console.log('La peticion termino')
      }
      
    })
  }

  async postAnswer(){
    this.arre2 = 
      {
        "id": 20,
        "post_id": 50,
        "name": "ana",
        "email": "anuraag_ganaka@kovacek.org",
        "body": "ana"
      }
    
 
   
  const resp = await this.tareasServices.postAnser(this.arre2)
       .subscribe(data => {
         console.log(data)        
       })      

       console.log(resp)
   
   }

}
