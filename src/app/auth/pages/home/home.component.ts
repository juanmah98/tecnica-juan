import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/interfaces/user';
import { UsuariosService } from 'src/app/services/usuarios.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  usuario: Login = {
    id: '',
    email: ''
  }
  
  constructor(private usuarioSerivces: UsuariosService) { }
  
  registro:string = '0';

  ngOnInit(): void { 
    this.registro = sessionStorage.getItem("registro") as string;
    console.log(this.registro)
  }

  async add(){

    const respnse = await this.usuarioSerivces.addUser(this.usuario);
    console.log(respnse);
  }

}
