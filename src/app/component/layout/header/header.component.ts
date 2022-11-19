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
    this.login = sessionStorage.getItem("login") as string;
    this.name = sessionStorage.getItem("name") as string;
   

  }

  salir(){
        sessionStorage.setItem("email", '');
        sessionStorage.setItem("name", '');
        this.login = '0';
        this.name = '';
        sessionStorage.setItem("login", '0');
  }

}
