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
   carga:boolean = false;
   nuevoRegistro:Registro = {
     id: '',
     email: '',
     password: '',
     name: ''
   }
   tareas:Tareas[] = [];
  constructor(private usuariosServices: UsuariosService, private tareasServices:TareasService) { }

  ngOnInit(): void {
    
    /* this.auxiliar(); */
    this.email = this.usuariosServices.getEmail();
    this.idUsuario =  this.usuariosServices.getIdUser();
    console.log(this.idUsuario)
    console.log(this.email);
    this.getTareas(this.idUsuario);
   
  }

  async auxiliar(){
     /* OBTENGO EL ID DE LA TABLA USER CON EL EMAIL DEL USUARIO. AL IGUAL QUE,
    GUARDO EN FIRESTORE EL EMAIL CON INICIO DE SECION GOOGLE SI ES LA PRIMERA VES QUE ENTRA */
    
  /*   let email = await sessionStorage.getItem("email") as string;
    this.email = email;

    await this.usuariosServices.getUsers().subscribe(prod => {
  
      this.usuarios = prod;      
      this.carga = true;   
      
    }); */

   
    /* for (var i = 0; i < this.usuarios.length; i++) {
        
        
      if(this.usuarios[i].email == email){
        this.bandera = true;                
        this.idUsuario = this.usuarios[i].id;
        console.log("for");
        console.log(this.idUsuario)
        this.getTareas();
      }
         
    
    }  */

   /*  this.usuarios.forEach(i=>{
         
      if(i.email == email){
        this.bandera = true;                
        this.idUsuario = i.id;
        console.log("for");
        console.log(i)
        this.getTareas();
      }
    }) */
/* if(this.carga==true){
  let aux:Registro[] = this.usuarios.filter(x => x.email ==email)
    console.log(aux);
    console.log(aux[0].email);
    console.log("EMAIL");
    if(aux.length==null){
      console.log("El usuario es nuevo");
      this.nuevoRegistro.email = email;
      this.usuariosServices.addUser(this.nuevoRegistro);    
    }else this.getTareas(aux[0].id);
}else await setTimeout(() => { this.auxiliar()  },100); */
  
 /*    if(this.bandera != true && this.idUsuario==''){
      console.log("El usuario es nuevo");
      this.nuevoRegistro.email = email;
   this.usuariosServices.addUser(this.nuevoRegistro);           
    }else console.log("Usuario ya creado"); */
                 
    
  
   
  }

 async getTareas(id:string){
    await this.tareasServices.getTareasCloud(id).subscribe(prod => {  
     
      this.tareas = prod.sort((a, b) => {
        
        return a.post_id - b.post_id;
        
      });   
      sessionStorage.setItem("length", String(prod.length));     
     
  
    });
  }

}
