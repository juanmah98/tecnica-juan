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
    
   
  }

}
