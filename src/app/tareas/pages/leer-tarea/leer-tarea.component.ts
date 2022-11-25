import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Tareas } from 'src/app/interfaces/tareas';
import { TareasService } from 'src/app/services/tareas.service';

@Component({
  selector: 'app-leer-tarea',
  templateUrl: './leer-tarea.component.html',
  styleUrls: ['./leer-tarea.component.css']
})
export class LeerTareaComponent implements OnInit {

  tareas:Tareas[] = [];
  auxiliar:Tareas[]=[];
  registerForm:any;
  @Input() idUser = '';
  @Input() arreglo:Tareas[] = [];
  titulo:string='';
  body:string='';

  tareaEditar:Tareas ={
    id: '',
    post_id: 0,
    name: '',
    body: '',
    lista: false
  };
  constructor(private tareasServices: TareasService, private formBuilder: FormBuilder) { 
    this.registerForm = this.formBuilder.group(
      {
        name: [''], 
        body: [''], 
      },
            
    )
  }

  ngOnInit(): void {   

  }

 async getTareas(){

  /*  ****** METODO GET CON API (API free con fallas) *******
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
      
    }) */


   await this.tareasServices.getTareasCloud(this.idUser).subscribe(prod => {  
      this.tareas = prod;      
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

  editarTarea(tarea:Tareas){
    this.titulo = tarea.name;
    this.body=tarea.body;
    this.tareaEditar = tarea;

  }

  async onEdit(){ 
 
    
    this.tareaEditar.name = this.registerForm.value.name;
    this.tareaEditar.body =  this.registerForm.value.body;
    
    await this.tareasServices.putTareaCloud(this.tareaEditar, this.idUser);   
  }

}
