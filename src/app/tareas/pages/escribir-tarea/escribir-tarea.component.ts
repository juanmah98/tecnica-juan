import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Tareas } from 'src/app/interfaces/tareas';
import { TareasService } from 'src/app/services/tareas.service';

@Component({
  selector: 'app-escribir-tarea',
  templateUrl: './escribir-tarea.component.html',
  styleUrls: ['./escribir-tarea.component.css']
})
export class EscribirTareaComponent implements OnInit {

  registerForm:any;
 
  nuevaTarea:Tareas ={
    id: 0,
    post_id: 0,
    name: '',
    email: '',
    body: ''
  };

  constructor( private tareasServices: TareasService, private formBuilder: FormBuilder,) { 
   
    this.registerForm = this.formBuilder.group(
      {
        name: [''], 
        body: [''], 
      },
            
    )
  }


  ngOnInit(): void {
  }

  write(){

  }

  async postAnswer(){
    this.nuevaTarea = 
      {
        "id": Math.random() * 100,
        "post_id": Math.random() * 1000,
        "name": this.registerForm.value.name,
        "email": sessionStorage.getItem("email") as string,
        "body": this.registerForm.value.body
      }
    
 
   
  const resp = await this.tareasServices.postAnser(this.nuevaTarea)
       .subscribe(data => {
         console.log(data)        
       })      

       console.log(resp)
   
   }
}
