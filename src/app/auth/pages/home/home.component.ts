import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/interfaces/user';
import { UsuariosService } from 'src/app/services/usuarios.service';
declare var google: any;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  login:string = '';
  usuario: Login = {
    id: '',
    email: ''
  }
  objetounico:any = {};
  constructor(private usuarioSerivces: UsuariosService) { }

  ngOnInit(): void {
 
    this.login = "0";
       sessionStorage.setItem("login", this.login);
  
    
       google.accounts.id.initialize({
         /* LOCAL */
            client_id: '58855272070-p13uorikkjp4k71fr4u82422p0d6tgtj.apps.googleusercontent.com',  
         /*  */
        /*    client_id: '501716064015-ghs2q8lm72me0bk9784ukjphu5p49jnj.apps.googleusercontent.com',     */
         callback: this.handleCredentialResponse
       });
       google.accounts.id.renderButton(
         document.getElementById("buttonDiv"),
         { theme: "outline", size: "large" }  // customization attributes
       );
       google.accounts.id.prompt(); // also display the One Tap dialog
     
   }
 
   handleCredentialResponse(response:any){
    
 
     if(response.credential){
       this.login = "1";
       sessionStorage.setItem("login", this.login);
       
       
       response.credential;
       
       var base64Url =  response.credential.split('.')[1];
       var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
       var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c){
         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        
        this.objetounico = JSON.parse(jsonPayload);
        console.log( JSON.parse(jsonPayload));
        
        sessionStorage.setItem("email", this.objetounico.email);
        sessionStorage.setItem("name", this.objetounico.name);
        sessionStorage.setItem("picture", this.objetounico.picture);
        console.log(this.objetounico.email);
      
         document.location.href = "/user"     

       /*  for (var i = 0; i < this.em.length; i++) {
          console.log("DENTRO DEL FOR");
          if (this.objetounico.email == this.em[i]) {
            console.log("ES IGUAL");
          }
        } */
        
       


      
      
    
     }
     console.log("Fin google btn");    
   }

  async add(){

    const respnse = await this.usuarioSerivces.addUser(this.usuario);
    console.log(respnse);
  }

}
