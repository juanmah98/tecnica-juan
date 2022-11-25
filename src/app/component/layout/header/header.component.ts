import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  login:string = '0';
  name:string = '';
  constructor(private userServices: UsuariosService) { }

  ngOnInit(): void {
    this.login = this.userServices.getLogin();
    
    this.name = this.userServices.getNamel();

  }

  salir(){

        sessionStorage.setItem("email", '');
        sessionStorage.setItem("name", ''); 
        this.login = '0';
        this.name = '';
        sessionStorage.setItem("login", '0');  
        sessionStorage.setItem("length", '');    
        setTimeout(() => {
          document.location.href = "/general";  
       },1000)
  }

}
