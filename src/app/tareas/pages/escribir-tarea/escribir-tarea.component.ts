import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Tareas } from 'src/app/interfaces/tareas';
import { TareasService } from 'src/app/services/tareas.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

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

  constructor( private tareasServices: TareasService, private formBuilder: FormBuilder, private usuarioServices: UsuariosService) { 
   
    this.registerForm = this.formBuilder.group(
      {
        name: [''], 
        body: [''], 
      },
            
    )
  }


  ngOnInit(): void {
    this.id = this.usuarioServices.getLength();
  }



  async postAnswer(){ 

      this.nuevaTarea = {
        id: '' ,
        post_id:Number(this.id)+1,
        name: this.registerForm.value.name,
        body: this.registerForm.value.body,
        lista: false
      };  
 
   
  await this.tareasServices.postTareaCloud(this.nuevaTarea, this.idUser);  
      
       this.clear();
       this.ngOnInit();

   }

   clear() {
    this.registerForm.reset();
  }
}
