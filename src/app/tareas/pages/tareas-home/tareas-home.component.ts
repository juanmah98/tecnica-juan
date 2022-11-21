import { Component, OnInit } from '@angular/core';
import { Registro } from 'src/app/interfaces/registro';
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
  constructor(private usuariosServices: UsuariosService) { }

  ngOnInit(): void {

this.auxiliar();
   
  }

  async auxiliar(){
     /* OBTENGO EL ID DE LA TABLA USER CON EL EMAIL DEL USUARIO. AL IGUAL QUE,
    GUARDO EN FIRESTORE EL EMAIL CON INICIO DE SECION GOOGLE SI ES LA PRIMERA VES QUE ENTRA */
    
    let email = sessionStorage.getItem("email") as string;
    this.email = email;

    await this.usuariosServices.getUsers().subscribe(prod => {
  
      this.usuarios = prod;     
   
      for (var i = 0; i < this.usuarios.length; i++) {
        
        console.log(this.email)
        if(this.usuarios[i].email == email){
          this.bandera = true;
          console.log(this.usuarios[i].id)          
          this.idUsuario = this.usuarios[i].id
        }
      
      }
      
    });

    setTimeout(() => {
      console.log("antes del if")
      console.log(this.bandera)
          if(this.bandera == false){
            this.nuevoRegistro.email = email;
      
            this.usuariosServices.addUser(this.nuevoRegistro);           
          }       
    },500)
  }

}
