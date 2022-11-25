import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Registro } from 'src/app/interfaces/registro';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: any;
  errorPass2:string = '';
  users:Registro[] = [];
  errorEmail:string = '';
  aux: boolean = false;
  newUser:boolean = false;

  constructor( private usuarioSerivces: UsuariosService, private formBuilder: FormBuilder,) { 
    const minPassLength = 1;
    this.registerForm = this.formBuilder.group(
      { 
        
        name: ['', [
        Validators.required, Validators.minLength(minPassLength)
      ]],
        email: ['', [
          Validators.required, Validators.email
        ]], 
        password: ['', [
          Validators.required, Validators.minLength(minPassLength)
        ]],
        password2: ['', [
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
      }else if(controlName == 'password'){
        error = 'La contraseña debe ser mayor a 4 digitos'        
      }else if(controlName == 'password2'){
        error = 'La contraseña debe ser mayor a 4 digitos' 
          
      }
    }
   
    return error;
  }
  message: boolean = false;
  @Output() messageEvent = new EventEmitter<boolean>();


  sendMessage() {
    this.messageEvent.emit(this.message)
  }  

  ngOnInit(): void {
    this.newUser = false;
    this.usuarioSerivces.getUsers().subscribe(prod => {
  
      this.users = prod;         
    });  
    this.aux = false;
  }

  errorPass(){
   
    if(this.registerForm.value.password != this.registerForm.value.password2){
     this.errorPass2 = 'las contraseñas deben coincidir';
    }else this.errorPass2 = '';

    return this.errorPass2
  }

 emailDuplicado(){  
  this.errorEmail = '';  
  this.aux=true;
  let cont = 0;

    this.users.forEach(b => {
      if(b.email == this.registerForm.value.email){       
        cont ++;        
      }    
    })

    if(cont > 0 ){
      this.errorEmail = 'el usuario ya existe'; 
      this.aux = false;
    }   
  
    return  this.errorEmail;
  }

  back(){
   this.sendMessage();
    
  }


 async register(){   
  const aux = await this.emailDuplicado()
    
    const newUser: Registro = {
      id: '',
      name: this.registerForm.value.name,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    }

   
    console.log(aux)
    if(aux == ''){

    /*   this.usuarioSerivces.addEmail(this.registerForm.value.email)
      this.usuarioSerivces.addName(this.registerForm.value.name)
      
      this.usuarioSerivces.loginUser(true); */

        this.newUser = true;
        sessionStorage.setItem("length", '');  
        sessionStorage.setItem("login", '1');
        sessionStorage.setItem("email", this.registerForm.value.email);
        sessionStorage.setItem("name",this.registerForm.value.name,);
        this.usuarioSerivces.addUser(newUser);     

        await this.usuarioSerivces.getUsers().subscribe(prod => {
  
          this.users = prod;     
       
          for (var i = 0; i < this.users.length; i++) {
            
           
            if(this.users[i].email == this.registerForm.value.email){
              
              sessionStorage.setItem("id", this.users[i].id);
             
            }
          }
        });  
        setTimeout(() => {
           document.location.href = "/tareas";  
        },4000)
    }
 
   
  }


  

}
