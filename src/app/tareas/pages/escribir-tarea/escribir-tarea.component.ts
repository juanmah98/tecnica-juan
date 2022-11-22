import { Component, Input, OnInit } from '@angular/core';
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
    id: '',
    post_id: 0,
    name: '',
    body: '',
    lista: false
  };

  
  @Input() idUser = '';

  id:string = '0';

  constructor( private tareasServices: TareasService, private formBuilder: FormBuilder,) { 
   
    this.registerForm = this.formBuilder.group(
      {
        name: [''], 
        body: [''], 
      },
            
    )
  }


  ngOnInit(): void {
   this.id = sessionStorage.getItem("length") as string
  }



  async postAnswer(){
   /*  this.nuevaTarea = 
      {
        "id: Math.floor(Math.random()*100),
        "post_id": Math.floor(Math.random()*1000),
        "name": this.registerForm.value.name,
        "email": sessionStorage.getItem("email") as string,
        "body": this.registerForm.value.body,
      } 
      
       const resp = await this.tareasServices.postTareaCloud(this.nuevaTarea, )
       .subscribe(data => {
         console.log(data)        
       })      
       console.log(resp)   
   }
      */

      this.nuevaTarea = {
        id: '' ,
        post_id:Number(this.id)+1,
        name: this.registerForm.value.name,
        body: this.registerForm.value.body,
        lista: false
      };  
 
   
  const resp = await this.tareasServices.postTareaCloud(this.nuevaTarea, this.idUser);  
       console.log(resp)   

       
       this.ngOnInit();

       this.clear();
   }

   clear() {
    console.log("clear clicked")
    this.registerForm.reset();
  }
}
