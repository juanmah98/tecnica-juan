import { Component, OnInit } from '@angular/core';
import { Registro } from 'src/app/interfaces/registro';
import { Tareas } from 'src/app/interfaces/tareas';
import { TareasService } from 'src/app/services/tareas.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-tareas-home',
  templateUrl: './tareas-home.component.html',
  styleUrls: ['./tareas-home.component.css']
})
export class TareasHomeComponent implements OnInit {

  usuarios:Registro[] =[];
  idUsuario = '';
  email: string ="";
   bandera:boolean = false;
   nuevoRegistro:Registro = {
     id: '',
     email: '',
     password: '',
     name: ''
   }
   tareas:Tareas[] = [];
  constructor(private usuariosServices: UsuariosService, private tareasServices:TareasService) { }

  ngOnInit(): void {
    this.auxiliar();
    
   
  }

  async auxiliar(){
     /* OBTENGO EL ID DE LA TABLA USER CON EL EMAIL DEL USUARIO. AL IGUAL QUE,
    GUARDO EN FIRESTORE EL EMAIL CON INICIO DE SECION GOOGLE SI ES LA PRIMERA VES QUE ENTRA */
    
    let email = await sessionStorage.getItem("email") as string;
    this.email = email;

    await this.usuariosServices.getUsers().subscribe(prod => {
  
      this.usuarios = prod;     
   
      for (var i = 0; i < this.usuarios.length; i++) {
        
        
        if(this.usuarios[i].email == email){
          this.bandera = true;                
          this.idUsuario = this.usuarios[i].id;
          console.log("for");
          console.log(this.idUsuario)
          this.getTareas();
        }
      
      }
      
    });

   await setTimeout(() => {     
          if(this.bandera == false){
            this.nuevoRegistro.email = email;
         this.usuariosServices.addUser(this.nuevoRegistro);           
          }              
    },1500)
   
  }

 async getTareas(){
  console.log("home tarea")
  console.log(this.idUsuario)
    await this.tareasServices.getTareasCloud(this.idUsuario).subscribe(prod => {  
      this.tareas = prod.sort((a, b) => {
        return a.post_id - b.post_id;
      });
      /* this.tareas = prod; */
      sessionStorage.setItem("length", String(prod.length));    
      
      console.log(prod);
  
    });
  }

}
