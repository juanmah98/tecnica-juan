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

  constructor( private usuarioSerivces: UsuariosService, private formBuilder: FormBuilder,) { 
    const minPassLength = 4;
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
    this.usuarioSerivces.getUsers().subscribe(prod => {
  
      this.users = prod;         
    });  
  }

  errorPass(){
   
    if(this.registerForm.value.password != this.registerForm.value.password2){
     this.errorPass2 = 'las contraseñas deben coincidir';
    }else this.errorPass2 = '';

    return this.errorPass2
  }

 emailDuplicado(){  
  this.errorEmail = '';  
  let cont = 0;

    this.users.forEach(b => {
      if(b.email == this.registerForm.value.email){       
        cont ++;
      }    
    })

    if(cont == 1){
      this.errorEmail = 'el usuario ya existe'; 
    }   
  
    return this.errorEmail;
  }

  back(){
   this.sendMessage();
    
  }


  async register(){   
    const newUser: Registro = {
      id: '',
      name: this.registerForm.value.name,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    }
   const response = await this.usuarioSerivces.addUser(newUser);
    console.log(response);
    sessionStorage.setItem("idUser", '');   
    sessionStorage.setItem("length", '');  
    document.location.href = "/tareas"  
  }


  

}
