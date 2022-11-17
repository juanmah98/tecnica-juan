import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralComponent } from './general/general.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: 'general',
    component: GeneralComponent,
    loadChildren: () => import('./general/general.module').then(m => m.GeneralModule)
  },
  {
    path: '',
    component: GeneralComponent,
    loadChildren: () => import('./general/general.module').then(m => m.GeneralModule)
  },
  {
    path: 'user',
    component: UserComponent,
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
