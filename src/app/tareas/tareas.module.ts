import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TareasRoutingModule } from './tareas-routing.module';
import { EscribirTareaComponent } from './pages/escribir-tarea/escribir-tarea.component';
import { LeerTareaComponent } from './pages/leer-tarea/leer-tarea.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TareasHomeComponent } from './pages/tareas-home/tareas-home.component';


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
  ]
})
export class TareasModule { }
