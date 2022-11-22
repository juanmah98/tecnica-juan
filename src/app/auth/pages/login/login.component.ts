import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Registro } from 'src/app/interfaces/registro';
import { UsuariosService } from 'src/app/services/usuarios.service';


declare var google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  login:string = '';
  objetounico:any = {};
  registerForm: any;
 aux:boolean = false;
  users:Registro[] = [];
  errorPassword: string = '';
  errorEmail: string = '';

  constructor( private usuarioSerivces: UsuariosService, private formBuilder: FormBuilder,) { 
    const minPassLength = 4;
    this.registerForm = this.formBuilder.group(
      {
        email: ['', [
          Validators.required, Validators.email
        ]], 
        password: ['', [
          Validators.required, Validators.minLength(minPassLength)
        ]]

      },
            
    )
  }

  public getError(controlName: string): string {
    let error = '';
    const control = this.registerForm.get(controlName);
    if (control.touched && control.errors != null) {
      if(controlName == 'email'){
        error = 'email invalido'
      }else  error = 'password invalido'
    }
    return error;
  }

  

  message: boolean = true;
  @Output() messageEvent = new EventEmitter<boolean>();


  sendMessage() {
    this.messageEvent.emit(this.message)
  }  
  
  ngOnInit(): void {
     this.aux=false;
   this.googleLog();
      
     
   }

  async googleLog(){
    sessionStorage.setItem("login", '0');
   await google.accounts.id.initialize({
      /* LOCAL */
      client_id: '58855272070-p13uorikkjp4k71fr4u82422p0d6tgtj.apps.googleusercontent.com',  
      /*  */
      /*  client_id: '58855272070-ddl9hj8uq3e3vs79cnflfdmckl3usm65.apps.googleusercontent.com',      */
      callback: this.handleCredentialResponse
    });
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" } 
    );
    google.accounts.id.prompt(); 
   }
 
   handleCredentialResponse(response:any){
    
 
     if(response.credential){
         
       
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
        sessionStorage.setItem("login", '1');
        console.log(this.objetounico.email);   
     
    
        document.location.href = "/tareas"  
    
     }
      
   }


  registrarse(){
   this.sendMessage();
    
  }

  async log(){
    this.errorEmail = 'el usuario no existe'
    this.errorPassword = ''
    console.log('logueo');
    console.log(this.registerForm.value)
    /* const respnse = await this.usuarioSerivces.addUser(this.usuario); */

   await this.usuarioSerivces.getUsers().subscribe(prod => {
  
      this.users = prod;     
   
      for (var i = 0; i < this.users.length; i++) {
        
        console.log(this.registerForm.value.email)
        if(this.users[i].email == this.registerForm.value.email){
          this.errorEmail = ''

          if(this.users[i].password == this.registerForm.value.password){
            sessionStorage.setItem("login", '1');
            sessionStorage.setItem("email", this.users[i].email);
        sessionStorage.setItem("name",  this.users[i].name);
        this.aux=true;
            document.location.href = "/tareas"  
          }else this.errorPassword = 'contraseña incorrecta'
         
        }
      }
    });  
  }

  errorPass(){
    return this.errorPassword;    
  }

  errorEm(){
    return this.errorEmail;    
  }



  

}
