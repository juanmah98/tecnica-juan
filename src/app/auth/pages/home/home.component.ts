import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  
  constructor() { }
  
  registro:boolean = false;

  actualizar(regis: boolean) {
    this.registro = regis;
 }

  ngOnInit(): void {    
  }



}
