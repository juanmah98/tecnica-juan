import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EscribirTareaComponent } from './pages/escribir-tarea/escribir-tarea.component';
import { LeerTareaComponent } from './pages/leer-tarea/leer-tarea.component';

const routes: Routes = [
  {
    path:'',
    children:[
      {path:'escribir', component: EscribirTareaComponent},
      {path:'leer', component: LeerTareaComponent},
      {path:'**', redirectTo: 'leer'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TareasRoutingModule { }
