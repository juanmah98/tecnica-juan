import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Registro } from '../../../interfaces/registro';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  
  constructor(private usuariosServices: UsuariosService) { }
  
  usuarios:Registro[] =[];
  email: string ="";
  registro:boolean = false;
  actualizar(regis: boolean) {
    this.registro = regis;
 }

  ngOnInit(): void {   
    
    let email = sessionStorage.getItem("email") as string;
    this.email = email;

    this.usuariosServices.getUsers().subscribe(prod => {
  
      this.usuarios = prod;     
   
      for (var i = 0; i < this.usuarios.length; i++) {
        
        console.log(this.email)
        if(this.usuarios[i].email == email){
          console.log(this.usuarios[i].id)
          sessionStorage.setItem("idUser", this.usuarios[i].id);          
        }
      
      }
      
    });
  }



}
