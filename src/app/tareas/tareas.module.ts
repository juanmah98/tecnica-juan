import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TareasRoutingModule } from './tareas-routing.module';
import { EscribirTareaComponent } from './pages/escribir-tarea/escribir-tarea.component';
import { LeerTareaComponent } from './pages/leer-tarea/leer-tarea.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TareasHomeComponent } from './pages/tareas-home/tareas-home.component';
import { UsuariosService } from '../services/usuarios.service';
import { TareasService } from '../services/tareas.service';


@NgModule({
  declarations: [
    EscribirTareaComponent,
    LeerTareaComponent,
    TareasHomeComponent
  ],
  imports: [
    CommonModule,
    TareasRoutingModule,
    FormsModule,
    ReactiveFormsModule ,
  ],
  providers:[UsuariosService, TareasService]
})
export class TareasModule { }
