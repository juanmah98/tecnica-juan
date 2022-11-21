import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  login:string = '0';
  name:string = '';
  constructor() { }

  ngOnInit(): void {
    
    if(sessionStorage.getItem("login") as string == null){
      this.login = '0';
    }else this.login = sessionStorage.getItem("login") as string;
    this.name = sessionStorage.getItem("name") as string;
   console.log(this.login);

  }

  salir(){
        sessionStorage.setItem("email", '');
        sessionStorage.setItem("name", '');
        this.login = '0';
        this.name = '';
        sessionStorage.setItem("login", '0');
        sessionStorage.setItem("idUser", '');   
        sessionStorage.setItem("length", '');                 
  }

}
